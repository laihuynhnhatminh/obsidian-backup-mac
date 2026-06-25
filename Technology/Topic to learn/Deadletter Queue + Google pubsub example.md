<span class="mcl-back-button">[[Technology/Topic to learn/index|← Topic to learn]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---



### Business/Reason:

- Learning dead letter queue (of course)
- Learning Python fastapi
- Learning google GCP and use the pubsub system.
- Simple deployment for 1 backend api and 1 listener

### Requirement:

- Create a system where:
	- Has 1 Python backend api for api request (send event to listener)
	- Listener here the request and queue up the item and handle event
	- Data is saved in redis for a period of time (15 minutes at most if never requested again)
	- System must contain a queue and deadletter queue to handle error.

### Excalidraw link here:

### Github link here:

- Here