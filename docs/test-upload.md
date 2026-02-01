# Test File Upload API

## Test Cases

### 1. Upload Image (JPEG)
```bash
POST http://localhost:3000/api/v1/upload-file
Content-Type: multipart/form-data

file: test-image.jpg
```

**Expected:**
- Status: 201
- File saved with original name: `{timestamp}-test-image.jpg`
- Image compressed to 800px width, 80% quality

---

### 2. Upload PDF
```bash
POST http://localhost:3000/api/v1/upload-file
Content-Type: multipart/form-data

file: test-document.pdf
```

**Expected:**
- Status: 201
- File saved with original name: `{timestamp}-test-document.pdf`
- PDF compressed (metadata removed)

---

### 3. Upload Oversized Image (> 5MB)
```bash
POST http://localhost:3000/api/v1/upload-file
Content-Type: multipart/form-data

file: large-image.jpg (6MB)
```

**Expected:**
- Status: 400
- Error: "Image file size must not exceed 5MB"

---

### 4. Upload Oversized PDF (> 10MB)
```bash
POST http://localhost:3000/api/v1/upload-file
Content-Type: multipart/form-data

file: large-document.pdf (11MB)
```

**Expected:**
- Status: 400
- Error: "PDF file size must not exceed 10MB"

---

### 5. Upload Invalid File Type
```bash
POST http://localhost:3000/api/v1/upload-file
Content-Type: multipart/form-data

file: document.docx
```

**Expected:**
- Status: 400
- Error: "Only allowed file types: jpeg, jpg, png, webp, pdf"

---

## How to Test

You can use any of these tools:
1. **Postman** - Import and test
2. **cURL** - Command line
3. **Thunder Client** (VS Code extension)
4. **Browser** - Simple HTML form

### Example cURL:
```bash
curl -X POST http://localhost:3000/api/v1/upload-file \
  -F "file=@/path/to/your/file.jpg"
```
