// ObsidianFetcher.js
// Obsidian Fetcher Class
// This class is used to fetch data in the Obsidian framework.

class ObsidianFetcher {

    _cache = {};
    _cacheDuration = 5 * 60 * 1000; // 5 minutes

    _isCacheValid(key) {
        const cacheEntry = this._cache[key];
        if (!cacheEntry) return false;
        return (Date.now() - cacheEntry.timestamp) < this._cacheDuration;
    }

    _buildRequestOptions(url, options) {
        const requestOptions = {
            url,
            method: "GET",
            body: null,
        }

        if (options && options.body) {
            requestOptions.body = JSON.stringify(options.body);
        }

        return requestOptions;
    }

    /**
     * Handle Obsidian fetch from a given URL, with optional caching.
     * 
     * @param {*} url
     * @param {*} options
     * @returns 
     */
    async request(url, options = {
        cached: false,
        cachedKey: null,
    }) {
        console.log(`ObsidianFetcher: request ${url} (cached: ${options.cached}, cachedKey: ${options.cachedKey})`);

        if (options.cached && this._isCacheValid(options.cachedKey)) {
            if (!options.cachedKey) {
                console.warn("ObsidianFetcher: cachedKey is required when using cached option");
                return [];
            }

            console.log("ObsidianFetcher: cache hit");
            return this._cache[options.cachedKey].data;
        }

        try {
            const { requestUrl } = require("obsidian");

            const requestOptions = this._buildRequestOptions(url, options);

            const r = await requestUrl(requestOptions);

            if (options.cached && options.cachedKey) {
                this._cache[options.cachedKey] = { data: r.text, timestamp: Date.now() };
                console.log("ObsidianFetcher: fetched & cached");
            }

            return r;
        } catch (e) {
            console.log("ObsidianFetcher fetch error", e);
            return null;
        }
    }
}
