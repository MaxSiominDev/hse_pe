package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func HelloWorldHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("hello world")
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/hello", HelloWorldHandler)
}
