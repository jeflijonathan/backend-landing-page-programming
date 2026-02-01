# Test Protected File Access

## Test Cases

### 1. View File Without Authentication
```bash
GET http://localhost:3000/api/v1/upload-file/view/1738246800000-document.pdf
```
**Expected:**
- Status: 401 Unauthorized
- Message: "Access token is required"

### 2. View File With Invalid Token
```bash
GET http://localhost:3000/api/v1/upload-file/view/1738246800000-document.pdf
Authorization: Bearer invalid_token_here
```
**Expected:**
- Status: 401 Unauthorized
- Message: "Invalid access token"

### 3. View File With Valid Token
```bash
GET http://localhost:3000/api/v1/upload-file/view/1738246800000-document.pdf
Authorization: Bearer {valid_jwt_token}
```
**Expected:**
- Status: 200 OK
- Headers: 
  - Content-Type: application/pdf (or image/jpeg etc)
- Body: File content (binary)

### 4. Direct Static Access (Should be disabled)
```bash
GET http://localhost:3000/uploads/1738246800000-document.pdf
```
**Expected:**
- Status: 404 Not Found (or 401 if using a catch-all)

---

## Frontend Integration Guide

Since regular `<img>` tags cannot send Authorization headers, use one of these methods:

### Option A: Blob URL (Recommended for React/Vue)

```javascript
/* React Component */
const ProtectedImage = ({ filename, token }) => {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/upload-file/view/${filename}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) throw new Error('Unauthorized');
      return res.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);
      setSrc(url);
    })
    .catch(err => console.error(err));
    
    // Cleanup
    return () => src && URL.revokeObjectURL(src);
  }, [filename, token]);

  if (!src) return <div>Loading...</div>;
  return <img src={src} alt="Protected content" />;
};
```

### Option B: Pre-authenticated URL (Signed URLs)
Currently not implemented (requires creating temporary public URLs).
