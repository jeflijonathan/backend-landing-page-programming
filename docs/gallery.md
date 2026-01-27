### feed /api/feed

/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Feed Successfully Fetched",
  "data": [
    {
      "id": 1,
      "id_post": "primary key 1",
      "title": "Feed 1",
      "description": "Description 1",
      "gallery_media": [
        {
            "media_id": 1,
            "feed_id": 1,
            "media_url":"id_upload_image 1",
            "display_order": 1,
            "created_at": "2026-01-16T00:05:50.000Z",
            "updated_at": "2026-01-16T00:05:50.000Z"
        },
        {
            "media_id": 2,
            "feed_id": 1,
            "media_url":"id_upload_image 2",
            "display_order": 2,
            "created_at": "2026-01-16T00:05:50.000Z",
            "updated_at": "2026-01-16T00:05:50.000Z"
        },
        {
            "media_id": 3,
            "feed_id": 1,
            "media_url":"id_upload_image 3",
            "display_order": 3,
            "created_at": "2026-01-16T00:05:50.000Z",
            "updated_at": "2026-01-16T00:05:50.000Z"
        }
      ],
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z"
    },
    {
      "id": 2,
      "title": "Feed 2",
      "description": "Description 2",
     "gallery_media": [
        {
            "media_id": 1,
            "feed_id": 1,
            "media_url":"id_upload_image 1",
            "display_order": 1,
            "created_at": "2026-01-16T00:05:50.000Z",
            "updated_at": "2026-01-16T00:05:50.000Z"
        },
        {
            "media_id": 2,
            "feed_id": 1,
            "media_url":"id_upload_image 2",
            "display_order": 2,
            "created_at": "2026-01-16T00:05:50.000Z",
            "updated_at": "2026-01-16T00:05:50.000Z"
        },
        {
            "media_id": 3,
            "feed_id": 1,
            "media_url":"id_upload_image 3",
            "display_order": 3,
            "created_at": "2026-01-16T00:05:50.000Z",
            "updated_at": "2026-01-16T00:05:50.000Z"
        }
      ],
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z"
    }
  ]
}
*/
### GET /api/feed/:id

/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Feed Successfully Fetched",
  "data": {
    "id": 1,
    "title": "Feed 1",
    "description": "Description 1",
    "gallery_media": [
        {
            "upload_id": "upload_id",
            "display_order": 1,
            
        }
        {
            "upload_id": "upload_id",
            "display_order": 2,
            
        },
        {
            "upload_id": "upload_id",
            "display_order": 3,
            
        }
    ],
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z"
  }
}
*/

### POST /api/feed

/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Feed Successfully Created",
  "data": {
    
    "title": "Feed 1",
    "description": "Description 1",
    "gallery_media": [
        {
            "upload_id": "upload_id",
            "display_order": 1,
            
        }
        {
            "upload_id": "upload_id",
            "display_order": 2,
            
        },
        {
            "upload_id": "upload_id",
            "display_order": 3,
            
        }
    ],
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z"
  }
}
*/

### PUT /api/feed/:id

/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Feed Successfully Updated",
  "data": {
    "id": 1,
    "title": "Feed 1",
    "description": "Description 1",
    "gallery_media": [
        {
            "upload_id": "upload_id",
            "display_order": 1,
            
        }
        {
            "upload_id": "upload_id",
            "display_order": 2,
            
        },
        {
            "upload_id": "upload_id",
            "display_order": 3,
            
        }
    ],
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z"
  }
}
*/

### DELETE /api/feed/:id (soft delete)

/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Feed Successfully Deleted",
  "data": {
    "id": 1,
    "title": "Feed 1",
    "description": "Description 1",
    "image_url": "https://example.com/image1.jpg",
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z"
  }
}
*/
