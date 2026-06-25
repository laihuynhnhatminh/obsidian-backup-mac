<span class="mcl-back-button">[[Technology/Toolings/AWS/index|← AWS]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


#deployment #aws #ec2 #guideline #cloud 

## Table Of Content

- [[#Prerequisites|Prerequisites]]
- [[#Project Setup|Project Setup]]
	- [[#Project Setup#Step 1: Initialize NextJS Application|Step 1: Initialize NextJS Application]]
	- [[#Project Setup#Step 2: Configure NextJS for Production|Step 2: Configure NextJS for Production]]
	- [[#Project Setup#Step 3: Add Health Check Endpoint|Step 3: Add Health Check Endpoint]]
- [[#Docker Configuration|Docker Configuration]]
	- [[#Docker Configuration#Step 1: Create Multi-Stage Dockerfile|Step 1: Create Multi-Stage Dockerfile]]
	- [[#Docker Configuration#Step 2: Create Docker Compose for Local Testing|Step 2: Create Docker Compose for Local Testing]]
	- [[#Docker Configuration#Step 3: Create .dockerignore|Step 3: Create .dockerignore]]
- [[#AWS EC2 Setup|AWS EC2 Setup]]
	- [[#AWS EC2 Setup#Step 1: Launch EC2 Instance|Step 1: Launch EC2 Instance]]
	- [[#AWS EC2 Setup#Step 2: Connect and Setup EC2|Step 2: Connect and Setup EC2]]
	- [[#AWS EC2 Setup#Step 3: Configure Swap Memory (Important for NextJS builds)|Step 3: Configure Swap Memory (Important for NextJS builds)]]
- [[#GitHub Actions Configuration|GitHub Actions Configuration]]
	- [[#GitHub Actions Configuration#Step 1: Create GitHub Secrets|Step 1: Create GitHub Secrets]]
	- [[#GitHub Actions Configuration#Step 2: Create GitHub Actions Workflow|Step 2: Create GitHub Actions Workflow]]
- [[#Nginx & SSL Configuration|Nginx & SSL Configuration]]
	- [[#Nginx & SSL Configuration#Step 1: Configure Nginx Reverse Proxy|Step 1: Configure Nginx Reverse Proxy]]
	- [[#Nginx & SSL Configuration#Step 2: Enable Site and Get SSL Certificate|Step 2: Enable Site and Get SSL Certificate]]
	- [[#Nginx & SSL Configuration#Step 3: Configure Auto-renewal|Step 3: Configure Auto-renewal]]
- [[#Domain Configuration|Domain Configuration]]
	- [[#Domain Configuration#Step 1: Point Domain to EC2|Step 1: Point Domain to EC2]]
	- [[#Domain Configuration#Step 2: Allocate Elastic IP (Important!)|Step 2: Allocate Elastic IP (Important!)]]
- [[#NextJS Optimization for Self-Hosting|NextJS Optimization for Self-Hosting]]
	- [[#NextJS Optimization for Self-Hosting#Step 1: Environment Variables|Step 1: Environment Variables]]
	- [[#NextJS Optimization for Self-Hosting#Step 2: Implement ISR (Incremental Static Regeneration)|Step 2: Implement ISR (Incremental Static Regeneration)]]
	- [[#NextJS Optimization for Self-Hosting#Step 3: Implement Caching Strategy|Step 3: Implement Caching Strategy]]
	- [[#NextJS Optimization for Self-Hosting#Step 4: Image Optimization|Step 4: Image Optimization]]
- [[#Monitoring & Maintenance|Monitoring & Maintenance]]
	- [[#Monitoring & Maintenance#Step 1: Setup Basic Monitoring|Step 1: Setup Basic Monitoring]]
	- [[#Monitoring & Maintenance#Step 2: Setup Logs|Step 2: Setup Logs]]
	- [[#Monitoring & Maintenance#Step 3: Backup Strategy|Step 3: Backup Strategy]]
- [[#Troubleshooting Common Issues|Troubleshooting Common Issues]]
	- [[#Troubleshooting Common Issues#NextJS Features Working Without Vercel|NextJS Features Working Without Vercel]]
	- [[#Troubleshooting Common Issues#Common Problems & Solutions|Common Problems & Solutions]]
- [[#Performance Optimization Tips|Performance Optimization Tips]]
- [[#Security Checklist|Security Checklist]]
- [[#Manual Deployment Process|Manual Deployment Process]]

## Prerequisites

Before starting, ensure you have:

- AWS Account with EC2 access
- GitHub repository for your project
- Domain name (you mentioned getting from Vercel)
- Basic knowledge of Linux commands
- Docker Desktop installed locally for testing

## Project Setup

### Step 1: Initialize NextJS Application

```bash
# Create new NextJS app with TypeScript and App Router
npx create-next-app@latest my-nextjs-app --typescript --tailwind --app --src-dir --import-alias "@/*"

cd my-nextjs-app

# Install additional dependencies for production optimization
npm install sharp
```

### Step 2: Configure NextJS for Production

Create/update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['your-domain.com'],
    unoptimized: false, // Keep optimization but handle it ourselves
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Enable ISR for self-hosting
    isrMemoryCacheSize: 25 * 1024 * 1024, // 25MB
  },
}

module.exports = nextConfig
```

### Step 3: Add Health Check Endpoint

Create `app/api/health/route.ts`:

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    { 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV 
    },
    { status: 200 }
  )
}
```

## Docker Configuration

### Step 1: Create Multi-Stage Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# ---- Base Node ----
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# ---- Dependencies ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --only=production && \
    cp -R node_modules prod_node_modules && \
    npm ci

# ---- Builder ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# ---- Production ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Step 2: Create Docker Compose for Local Testing

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  nextjs:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Step 3: Create .dockerignore

Create `.dockerignore`:

```
.git
.gitignore
.next
.dockerignore
Dockerfile
docker-compose.yml
node_modules
npm-debug.log
README.md
.env*.local
.cache
.github
coverage
.vscode
```

## AWS EC2 Setup

### Step 1: Launch EC2 Instance

1. Go to AWS EC2 Console
2. Click "Launch Instance"
3. Configure:
    - **Name**: nextjs-production-server
    - **AMI**: Ubuntu Server 24.04 LTS
    - **Instance Type**: t3.small (minimum for production)
    - **Key Pair**: Create new or use existing
    - **Network Settings**:
        - Allow SSH (port 22)
        - Allow HTTP (port 80)
        - Allow HTTPS (port 443)
    - **Storage**: 20 GB gp3

### Step 2: Connect and Setup EC2

```bash
# Connect to EC2
ssh -i your-key.pem ubuntu@your-ec2-public-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Nginx
sudo apt install nginx -y

# Install Certbot for SSL
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# Create app directory
mkdir -p /home/ubuntu/app
```

### Step 3: Configure Swap Memory (Important for NextJS builds)

```bash
# Create swap file (4GB recommended)
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## GitHub Actions Configuration

### Step 1: Create GitHub Secrets

In your GitHub repository, go to Settings → Secrets and add:

- `EC2_HOST`: Your EC2 public IP
- `EC2_USER`: ubuntu
- `EC2_SSH_KEY`: Contents of your .pem file
- `DOCKER_REGISTRY_USER`: (optional if using Docker Hub)
- `DOCKER_REGISTRY_PASSWORD`: (optional if using Docker Hub)

### Step 2: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to EC2

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'production'
        type: choice
        options:
          - production
          - staging

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3

    - name: Log in to GitHub Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}

    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: |
          ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
          ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
        cache-from: type=gha
        cache-to: type=gha,mode=max

    - name: Deploy to EC2
      uses: appleboy/ssh-action@v1.0.0
      with:
        host: ${{ secrets.EC2_HOST }}
        username: ${{ secrets.EC2_USER }}
        key: ${{ secrets.EC2_SSH_KEY }}
        script: |
          # Login to GitHub Container Registry
          echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin
          
          # Pull latest image
          docker pull ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
          
          # Stop and remove old container
          docker stop nextjs-app || true
          docker rm nextjs-app || true
          
          # Run new container
          docker run -d \
            --name nextjs-app \
            --restart unless-stopped \
            -p 127.0.0.1:3000:3000 \
            -e NODE_ENV=production \
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
          
          # Clean up old images
          docker image prune -af
          
          # Verify deployment
          sleep 10
          curl -f http://localhost:3000/api/health || exit 1
```

## Nginx & SSL Configuration

### Step 1: Configure Nginx Reverse Proxy

Create Nginx configuration on EC2:

```bash
sudo nano /etc/nginx/sites-available/nextjs-app
```

Add configuration:

```nginx
# Rate limiting
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=api:10m rate=30r/s;

# Upstream configuration
upstream nextjs_upstream {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration (will be added by Certbot)
    # ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json application/ld+json;

    # Client body size
    client_max_body_size 10M;

    # Timeouts
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;

    # Static files caching
    location /_next/static {
        proxy_pass http://nextjs_upstream;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Public static files
    location /static {
        proxy_pass http://nextjs_upstream;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # API routes with higher rate limit
    location /api {
        limit_req zone=api burst=10 nodelay;
        
        proxy_pass http://nextjs_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # NextJS Image Optimization
    location /_next/image {
        proxy_pass http://nextjs_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Cache images
        proxy_cache_valid 30d;
        add_header Cache-Control "public, max-age=2592000";
    }

    # Main application
    location / {
        limit_req zone=general burst=20 nodelay;
        
        proxy_pass http://nextjs_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 2: Enable Site and Get SSL Certificate

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/nextjs-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Step 3: Configure Auto-renewal

```bash
# Test renewal
sudo certbot renew --dry-run

# Certbot automatically adds a cron job, verify with:
sudo systemctl status snap.certbot.renew.service
```

## Domain Configuration

### Step 1: Point Domain to EC2

Since you're getting domain from Vercel:

1. Go to Vercel Dashboard → Domains
2. Add your domain
3. Configure DNS:
    - **A Record**: `@` → Your EC2 Elastic IP
    - **A Record**: `www` → Your EC2 Elastic IP
    - **Remove** any Vercel-specific records

### Step 2: Allocate Elastic IP (Important!)

```bash
# In AWS Console:
# 1. Go to EC2 → Elastic IPs
# 2. Allocate Elastic IP
# 3. Associate with your EC2 instance
# This ensures your IP doesn't change on restart
```

## NextJS Optimization for Self-Hosting

### Step 1: Environment Variables

Create `.env.production`:

```env
# API URLs
NEXT_PUBLIC_API_URL=https://your-domain.com
API_URL=http://localhost:3000

# Performance
NEXT_SHARP_PATH=/app/node_modules/sharp

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-ga-id
```

### Step 2: Implement ISR (Incremental Static Regeneration)

Example in `app/blog/[slug]/page.tsx`:

```typescript
import { notFound } from 'next/navigation'

export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  // Generate paths at build time
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  
  if (!post) {
    notFound()
  }
  
  return <article>{/* Your content */}</article>
}
```

### Step 3: Implement Caching Strategy

Create `lib/cache.ts`:

```typescript
import { unstable_cache } from 'next/cache'

export const getCachedData = unstable_cache(
  async (id: string) => {
    // Your data fetching logic
    const data = await fetchData(id)
    return data
  },
  ['data-cache'],
  {
    revalidate: 3600, // 1 hour
    tags: ['data'],
  }
)
```

### Step 4: Image Optimization

Configure image loader in `next.config.js`:

```javascript
const nextConfig = {
  images: {
    loader: 'default',
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}
```

## Monitoring & Maintenance

### Step 1: Setup Basic Monitoring

Create monitoring script on EC2:

```bash
sudo nano /home/ubuntu/monitor.sh
```

```bash
#!/bin/bash

# Check if container is running
if [ ! "$(docker ps -q -f name=nextjs-app)" ]; then
    echo "Container is not running. Attempting restart..."
    docker start nextjs-app || docker run -d \
        --name nextjs-app \
        --restart unless-stopped \
        -p 127.0.0.1:3000:3000 \
        -e NODE_ENV=production \
        ghcr.io/your-username/your-repo:latest
fi

# Check health endpoint
if ! curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "Health check failed. Restarting container..."
    docker restart nextjs-app
fi
```

```bash
chmod +x /home/ubuntu/monitor.sh

# Add to crontab
crontab -e
# Add: */5 * * * * /home/ubuntu/monitor.sh >> /home/ubuntu/monitor.log 2>&1
```

### Step 2: Setup Logs

```bash
# View Docker logs
docker logs nextjs-app --tail 100 -f

# Setup log rotation
sudo nano /etc/docker/daemon.json
```

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

### Step 3: Backup Strategy

Create backup script:

```bash
#!/bin/bash
# Backup Docker volumes and configurations
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/ubuntu/backups"

mkdir -p $BACKUP_DIR

# Backup Nginx configs
sudo tar -czf $BACKUP_DIR/nginx_$DATE.tar.gz /etc/nginx/

# Backup SSL certificates
sudo tar -czf $BACKUP_DIR/ssl_$DATE.tar.gz /etc/letsencrypt/

# Keep only last 7 days of backups
find $BACKUP_DIR -type f -mtime +7 -delete
```

## Troubleshooting Common Issues

### NextJS Features Working Without Vercel

1. **API Routes**: Work normally through reverse proxy
2. **Image Optimization**: Handled by Sharp library in Docker
3. **ISR**: Works with filesystem cache
4. **Middleware**: Fully functional
5. **App Router**: Complete support
6. **Server Components**: Work as expected

### Common Problems & Solutions

1. **504 Gateway Timeout**
    
    - Increase Nginx timeout values
    - Check if container is running: `docker ps`
2. **Images Not Loading**
    
    - Check Sharp installation in Docker
    - Verify image domains in next.config.js
3. **High Memory Usage**
    
    - Enable swap memory
    - Use `NODE_OPTIONS='--max-old-space-size=2048'`
4. **Slow Initial Load**
    
    - Implement proper caching headers
    - Use CDN for static assets (CloudFront)
5. **WebSocket Issues**
    
    - Ensure Nginx proxy headers are correct
    - Check upgrade headers configuration

## Performance Optimization Tips

1. **Use CloudFront CDN** for static assets:
    
    - Create CloudFront distribution
    - Point to your EC2 instance
    - Configure cache behaviors
2. **Database Optimization**:
    
    - Use connection pooling
    - Implement query caching
    - Consider RDS for production
3. **Monitoring Tools**:
    
    - Install PM2 for process management
    - Use CloudWatch for metrics
    - Setup Datadog or New Relic for APM

## Security Checklist

- [ ] SSL/TLS configured and auto-renewing
- [ ] Firewall rules configured (only 80, 443, 22 open)
- [ ] Regular system updates scheduled
- [ ] Docker images regularly updated
- [ ] Environment variables secured
- [ ] Rate limiting configured
- [ ] Security headers implemented
- [ ] Regular backups scheduled
- [ ] Monitoring and alerting setup
- [ ] SSH key-only authentication

## Manual Deployment Process

To deploy manually:

1. Go to GitHub Actions tab
2. Select "Deploy to EC2" workflow
3. Click "Run workflow"
4. Select environment (production/staging)
5. Click "Run workflow" button
6. Monitor deployment progress
7. Verify at https://your-domain.com
