package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func handler(w http.ResponseWriter, r *http.Request) {
	hostname, _ := os.Hostname()
	fmt.Fprintf(w, "Halo! Ini adalah Case 5: Multi-Stage Build.\n")
	fmt.Fprintf(w, "Aplikasi Go ini berjalan di dalam container dengan Hostname: %s\n", hostname)
}

func main() {
	http.HandleFunc("/", handler)
	log.Println("Server berjalan di port :8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}