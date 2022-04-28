package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
)

const (
	username = "u6wx436pzyrcfyng"
	password = "xKmVOSTZig2wTlaLovHp"
	hostname = "be1jzdvzxi6zn0ufd8l5-mysql.services.clever-cloud.com"
	dbName   = "be1jzdvzxi6zn0ufd8l5"
)

func dsn(test string) string {
	return fmt.Sprintf("%s:%s@tcp(%s)/%s", username, password, hostname, dbName)
}

var Db *sql.DB

func main() {

	db, err := sql.Open("mysql", dsn("be1jzdvzxi6zn0ufd8l5"))
	if err != nil {
		log.Fatal("Db connection error")
	}
	Db = db

	fmt.Println("Connected to database")

	router := echo.New()

	router.GET("/", mainHandler)
	router.GET("/coba", cobaHandler)
	router.POST("/coba", postHandler)
	router.POST("/addPenyakit", addPenyakit)
	router.POST("/pencarian", pencarianHandler)

	router.Logger.Fatal(router.Start(":8080"))

}

func mainHandler(c echo.Context) error {
	return c.JSON(http.StatusOK, gin.H{
		"name": "Ken",
		"age":  "24",
	})

}

func cobaHandler(c echo.Context) error {
	return c.String(http.StatusOK, "nama Halo")

}

type cekDna struct {
	Pengguna   string `json:"nama" binding:"required"`
	Dna        string `json:"dna" binding:"required"`
	Sakit      string `json:"sakit" binding:"required"`
	Tanggal    string `json:"date" binding:"required"`
	Status     string `json:"status"`
	Presentase int    `json:"presentase"`
}

type pencarian struct {
	Tanggal string `json:"date"`
	Sakit   string `json:"sakit"`
}

func postHandler(c echo.Context) error {
	//pengguna, dna, sakit, date
	body := make(map[string]interface{})

	err := json.NewDecoder(c.Request().Body).Decode(&body)
	if err != nil {
		return err
	}

	nama := body["nama"].(string)
	dna := body["dna"].(string)
	sakit := body["sakit"].(string)
	date := body["date"].(string)

	tanggal := time.Now().Format("2006-01-02")

	fmt.Println(tanggal)
	var status string
	var presentase int

	fmt.Println(nama, dna, sakit, date)
	status = "True"
	presentase = 100
	// err = Db.Ping()
	// if err != nil {
	// 	fmt.Println("Database connection error")
	// 	panic(err.Error())
	// 	return err
	// }

	Db.Query("INSERT INTO hasil_prediksi (Tanggal_Prediksi, Nama_Pasien, Penyakit_Prediksi	,Status_Terprediksi) VALUES (?, ?, ?, ?)", tanggal, nama, sakit, status)

	return c.JSON(http.StatusOK, cekDna{nama, dna, sakit, date, status, presentase})
}

type Penyakit struct {
	Penyakit string `json:"penyakit"`
	Sequence string `json:"sequence"`
}

func addPenyakit(c echo.Context) error {
	body := make(map[string]interface{})

	err := json.NewDecoder(c.Request().Body).Decode(&body)
	if err != nil {
		return err
	}

	penyakit := body["penyakit"].(string)
	sequence := body["sequence"].(string)

	err = Db.QueryRow("SELECT * FROM jenis_penyakit WHERE Nama_Penyakit = ?", penyakit).Scan()
	if err != sql.ErrNoRows {
		return c.String(http.StatusPartialContent, "Penyakit sudah ada")

	}
	Db.Query("INSERT INTO jenis_penyakit (Nama_Penyakit, DNA_Penyusun) VALUES (?, ?)", penyakit, sequence)
	return c.String(http.StatusOK, "Berhasil menambahkan penyakit")

}

func pencarianHandler(c echo.Context) error {
	body := make(map[string]interface{})

	err := json.NewDecoder(c.Request().Body).Decode(&body)
	if err != nil {
		return err
	}

	tanggal := body["date"].(string)
	sakit := body["sakit"].(string)

	var hasil []cekDna

	switch {

	case (tanggal == "" && sakit == ""):
		return c.String(http.StatusPartialContent, "Harap isi salah satu")

	case (tanggal == "" && sakit != ""):
		err := Db.QueryRow("SELECT * FROM hasil_prediksi WHERE Penyakit_Prediksi = ?", sakit).Scan(&hasil)
		if err == sql.ErrNoRows {
			return c.String(http.StatusPartialContent, "Tidak ada data")
		}

	case (tanggal != "" && sakit == ""):
		err := Db.QueryRow("SELECT * FROM hasil_prediksi WHERE Tanggal_Prediksi = ?", tanggal).Scan(&hasil)
		if err == sql.ErrNoRows {
			return c.String(http.StatusPartialContent, "Tidak ada data")
		}

	case (tanggal != "" && sakit != ""):
		err := Db.QueryRow("SELECT * FROM hasil_prediksi WHERE Tanggal_Prediksi = ? AND Penyakit_Prediksi = ?", tanggal, sakit).Scan(&hasil)
		if err == sql.ErrNoRows {
			return c.String(http.StatusPartialContent, "Tidak ada data")
		}

	}

	return c.JSON(http.StatusOK, hasil)

}
