package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// MongoDB connection URI
	uri := "mongodb://localhost:27017"

	// Create a new client and connect to the server
	client, err := mongo.NewClient(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}
	defer client.Disconnect(ctx)

	fmt.Println("Connected to MongoDB!")

	// Access a database and collection
	database := client.Database("testdb")
	collection := database.Collection("testcollection")

	// Insert a document
	doc := bson.D{{"name", "John Doe"}, {"age", 30}, {"city", "New York"}}
	result, err := collection.InsertOne(ctx, doc)
	if err != nil {
		log.Fatalf("Failed to insert document: %v", err)
	}
	fmt.Printf("Inserted document with ID: %v\n", result.InsertedID)

	// Query documents
	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		log.Fatalf("Failed to find documents: %v", err)
	}
	defer cursor.Close(ctx)

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
}