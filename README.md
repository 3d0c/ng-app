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

### Login

```javascript
POST /sessions
{
	"email":      "registered@email",
	"password":   "password"
}
```

Result: __Token Object__:

```javascript
{
	"token":      "f09023a4b37fc7ae1c5d5d48b89b9466",
	"expiration": "2015-07-03T15:12:21.209645494+03:00",
	"user_id": 1
}
```

### Auth
Add received token to each request. Header name is `Token`

### Logout

```javascript
Token: f09023a4b37fc7ae1c5d5d48b89b9466

DELETE /sessions/f09023a4b37fc7ae1c5d5d48b89b9466
```

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

### Users

Methods:

```
GET    /users   (closed method, Admin only)

POST   /users   (public method, register)

// Token required
GET    /users/:id (get profile)
PUT    /users/:id + user object
```

__User Object:__

```
{
	"id": 1,
	"name": "Test",
	"status": "Yep",

	"avatar_id": 1,	// updatable
	
	// expanded object (not updatable)
	"avatar": { 
	    "id":   1, 
		"key":  "9a8935f4-26bc-4e72-80d6-26690b282eb1",
		"link": "http://ugc.capsulesapp.net/9a8935f4-26bc-4e72-80d6-26690b282eb1"
		"content_type": "image/jpeg"
	},
	
	"plan_id": 1, // plan_id = 0 is free, default for users plan_id

	// expanded object (RO)
	"plan": {
		"id": 1
		"name": "simple pro",
		"price": 123.00 
	}

	// read-only field
    "paid_till": "2015-10-01T01:01:01Z" // "0001-01-01T00:00:00Z" - free plan

    "vkId": "",
    "fbId": "",
    "hide_socials": false
}
```

Update example:

```
Token: f09023a4b37fc7ae1c5d5d48b89b9466

PUT /users/1
{
	"name": "New name",
	"status": "Yep yep",
    "avatar_id": 10
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




