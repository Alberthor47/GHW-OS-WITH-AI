# MongoDB Go Program

This program demonstrates how to connect to a MongoDB database using Go, insert a document, and query documents. Below is a line-by-line explanation of the code:

## Code Explanation

### Imports

```go
import (
 "context"
 "fmt"
 "log"
 "time"

 "go.mongodb.org/mongo-driver/bson"
 "go.mongodb.org/mongo-driver/mongo"
 "go.mongodb.org/mongo-driver/mongo/options"
)
```

- `context`: Used to manage timeouts and deadlines for operations.
- `fmt`: Provides formatted I/O functions.
- `log`: Used for logging errors and information.
- `time`: Used to set timeouts.
- `bson`: Provides BSON encoding and decoding for MongoDB.
- `mongo`: The MongoDB driver for Go.
- `options`: Provides configuration options for the MongoDB client.

### Main Function

```go
func main() {
```

- The entry point of the program.

### MongoDB Connection URI

```go
uri := "mongodb://localhost:27017"
```

- Specifies the MongoDB connection string. Replace `localhost:27017` with your MongoDB server address if needed.

### Create a New Client

```go
client, err := mongo.NewClient(options.Client().ApplyURI(uri))
if err != nil {
 log.Fatalf("Failed to create client: %v", err)
}
```

- Creates a new MongoDB client using the connection URI.
- Logs an error and exits if the client creation fails.

### Context and Timeout

```go
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()
```

- Creates a context with a 10-second timeout for operations.
- `defer cancel()` ensures the context is canceled to free resources.

### Connect to MongoDB

```go
err = client.Connect(ctx)
if err != nil {
 log.Fatalf("Failed to connect to MongoDB: %v", err)
}
defer client.Disconnect(ctx)
```

- Connects to the MongoDB server.
- Logs an error and exits if the connection fails.
- `defer client.Disconnect(ctx)` ensures the client disconnects when the program ends.

### Confirmation Message

```go
fmt.Println("Connected to MongoDB!")
```

- Prints a confirmation message upon successful connection.

### Access Database and Collection

```go
database := client.Database("testdb")
collection := database.Collection("testcollection")
```

- Accesses the `testdb` database and the `testcollection` collection.

### Insert a Document

```go
doc := bson.D{{"name", "John Doe"}, {"age", 30}, {"city", "New York"}}
result, err := collection.InsertOne(ctx, doc)
if err != nil {
 log.Fatalf("Failed to insert document: %v", err)
}
fmt.Printf("Inserted document with ID: %v\n", result.InsertedID)
```

- Creates a BSON document with fields `name`, `age`, and `city`.
- Inserts the document into the collection.
- Logs an error and exits if the insertion fails.
- Prints the ID of the inserted document.

### Query Documents

```go
cursor, err := collection.Find(ctx, bson.D{})
if err != nil {
 log.Fatalf("Failed to find documents: %v", err)
}
defer cursor.Close(ctx)
```

- Queries all documents in the collection.
- Logs an error and exits if the query fails.
- Ensures the cursor is closed after use.

### Iterate Over Results

```go
fmt.Println("Documents:")
for cursor.Next(ctx) {
 var document bson.M
 if err := cursor.Decode(&document); err != nil {
  log.Fatalf("Failed to decode document: %v", err)
 }
 fmt.Println(document)
}

if err := cursor.Err(); err != nil {
 log.Fatalf("Cursor error: %v", err)
}
```

- Iterates over the query results.
- Decodes each document into a `bson.M` map and prints it.
- Logs an error and exits if decoding or cursor iteration fails.

### End of Program

```go
}
```

- Marks the end of the `main` function.
