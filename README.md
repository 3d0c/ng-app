## Setup

```
~ bower install
```

# API spec


### Errors
Standard error codes + error object on 4xx and 5xx.

E.g:

```
HTTP/1.1 409 Conflict

{
    "error_message": "This is email is already registered"
}
```

### Partners

Methods:

```
POST   /partners (create new partner/registration, public method)
GET    /partners/:id (token required)
```


```javascript
POST /partners
{
	"email":      "registered@email",
	"password":  "password",
	"company":   "some name"
}
```

__Partner Object:__

```javascript
{
    "id": 196,
    "company_name": "",
    "email": "my1447",
    "plan": {
        "id": 1,
        "name": "Testing",
        "price": 0,
        /*
        TODO
        Plan limitations will be here.
        e.g.:
        "authors_count": 3,
		*/
    },
    "planId": 1,
    "period": {
        "id": 1,
        "name": "1 Month",
        "value": 1,
        "discount": 0
    },
    "periodId": 1,
    "paidTill": "0001-01-01T00:00:00Z" // free plan
}
```

### Login

```javascript
POST /sessions
{
	"email":      "registered@email",
	"password":  "password"
}
```

Result: __Token Object__:

```javascript
{
	"token":      "f09023a4b37fc7ae1c5d5d48b89b9466",
	"expiration": "2015-07-03T15:12:21.209645494+03:00",
	"partner_id": 1
}
```

### Auth
Add received token to each request. Header name is `Token`

### Logout

```javascript
Token: f09023a4b37fc7ae1c5d5d48b89b9466

DELETE /sessions/f09023a4b37fc7ae1c5d5d48b89b9466
```

-----

### Policy
S3 policy data

Methods:

```
GET /policy
```

__Policy object:__

```javascript
{

	"policy":         "policy_data",
	"acl":            "public-read",
	"url":            "http://xxx.s3.amazonaws.com/",
	"AWSAccessKeyId": "AWS_KEY_ID",
	"signature":       "some_key"
}
```
Fields are case sensitive.

### Authors

Methods:

```
GET    /authors (list of Author objects)
POST   /authors (create new author)

GET    /authors/:id 
PUT    /authors/:id + author object
DELETE /authors/:id
```

__Author Object:__

```
{
	"id": 1,
	"name": "Test",
	"status": "Yep",
		
	"avatar": {
	    "id":   1, 
		"key":  "9a8935f4-26bc-4e72-80d6-26690b282eb1",
		"link": "http://ugc.capsulesapp.net/9a8935f4-26bc-4e72-80d6-26690b282eb1"
		"content_type": "image/jpeg"
	},
	
    "vkId": "",
    "fbId": "",
    "hide_socials": false
}
```

Update example:

```
Token: f09023a4b37fc7ae1c5d5d48b89b9466

PUT /author/1
{
	"name": "New name",
	"status": "Yep yep",
	
    "avatar": {
        "id":  "1",
    	"key": "1b2345f4-66bc-5e72-20d1-14321a543eb2" // client generated uuid, see "Working with media" part.
    	"content_type": "image/jpeg"
	}
}
```

### Capsules

Methods:

```
GET  /capsules (list of capsule objects)
POST /capsules (create new capsule)

GET    /capsules/:id 
PUT    /capsules/:id + capsule object
DELETE /capsules/:id
```

__Capsule object:__

```javascript
{
	"id":         1,
	"name":       "Capsule One",
	"address":    "Russia, Moscow, Somewhere, 12/1",
	"lat":        55.123,
	"lng":        34.123
	"status":     "",       // (enum) @TODO
	"type":       "general" // (enum) ("general" | "news"),
	"radius":     100,      // (int) meters
	"openLimit":  100,
	"openLeft":   50,
	"start_time": "2015-10-04T14:48:00Z" // ISO 8601,
	"stop_time":  "2015-10-10T14:48:00Z" // ISO 8601,
	"password":   "clearText",
	"hint":       "passwordHint",
	"price":      0,    // (int), 0 for free
	"commentable": true // (bool)

	"author": {
		// Author object
	},

	"avatar": {
		// media object
		"id":    1,
		"key":   "9a8935f4-26bc-4e72-80d6-26690b282eb1",
		"link": "http://ugc.capsulesapp.net/9a8935f4-26bc-4e72-80d6-26690b282eb1",
		"content_type": "image/jpeg"
	},

	"content": [
		// media objects
		// view corresponds to the order
		{
		    "id":    7,
			"key":   "9a8935f4-26bc-4e72-80d6-26690b282eb1",
			"link": "http://ugc.capsulesapp.net/9a8935f4-26bc-4e72-80d6-26690b282eb1",
			"content_type": "video/quicktime",
			// makes sense only for video types, could be user defined
			"placeholder": {
				// media object
				"id":  "9a8935f4-26bc-4e72-80d6-26690b282eb1",
				"link": "http://ugc.capsulesapp.net/9a8935f4-26bc-4e72-80d6-26690b282eb1",
			}		
			
		},
		{
		    "id":            8,
			"key":           "9a8935f4-26bc-4e72-80d6-26690b282eb1",
			"text_value":   "text block",
			"content_type": "text/plain"
		},
		{
			"id":            9,
			"key":           "9a8935f4-26bc-4e72-80d6-26690b282eb2",
			"link":         "http://ugc.capsulesapp.net/9a8935f4-26bc-4e72-80d6-26690b282eb2",
			"content_type": "image/jpeg",

		},
		{
			"id":           10,
			"key":          "9a8935f4-26bc-4e72-80d6-26690b282eb3",
			"link":         "http://ugc.capsulesapp.net/9a8935f4-26bc-4e72-80d6-26690b282eb3",
			"content_type": "audio/x-caf",

		}
	},
	
	"background": {
		// media object
		"id":   1,
		"key":  "9a8935f4-26bc-4e72-80d6-26690b282eb1",
		"link": "http://ugc.capsulesapp.net/9a8935f4-26bc-4e72-80d6-26690b282eb1",
	}
	
}
```

__Media Objects:__

For media types:  

```javascript
{
	"id":           1,
	"key":          "9a8935f4-26bc-4e72-80d6-26690b282eb1" // user generated uuid v4
	"link":         "http://..."                           // server generated link, read-only
	"content-type": "image/jpeg" 
}

```

For text blocks:

```javascript
{
	"id":           "2",
	"text_value":   "text block",
	"content_type": "text/plain"
}
```

### Comments

Methods:

```
GET  /capsules/:id/comments?sort=created,type (list of comment objects)
POST /capsules/:id/comments (create new comment)
```

__Comment object:__

```javascript
	"sender": {
		"id":   6564
		"name": "Jimmy",
		"fb_id": "1234567890",
		"vk_id": "0987654321",
		"type": "registered",         // "guest" 
	},
	"text": "Oops",
	"type": "neutral",                // "negative", "positive"
	"created": "2015-10-10T14:48:00Z" // ISO 8601,
```


### Working with media
If updating object contains some media data, do it __before__ PUT

- GET /policy
- Generate uuid
- Create and post form to S3

```javascript
// Example with ng-file-upload
file.upload = Upload.upload({
	url: policy.url,
	method: 'POST',
	fields: {
		key: generated_uuid,
		AWSAccessKeyId: policy.AWSAccessKeyId,
		acl: policy.acl,
		policy: policy.policy,
		signature: policy.signature,
		'Content-Type': file.type
	},
	file : file
});
```

- Do PUT request




