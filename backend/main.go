package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	handlers "test-api/func"
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
	Pengguna string `json:"nama" binding:"required"`
	Dna      string `json:"dna" binding:"required"`
	Sakit    string `json:"sakit" binding:"required"`
	Tanggal  string `json:"date" binding:"required"`
	Status   string `json:"status"`
}

type pencarian struct {
	Tanggal string `json:"date"`
	Nama    string `json:"nama"`
	Sakit   string `json:"sakit"`
	Status  string `json:"status"`
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
	kmp := body["checked"].(bool)

	tanggal := time.Now().Format("2006-01-02")

	fmt.Println(tanggal)
	var status string

	isValid := handlers.DNAValidator(dna)
	if !isValid {
		return c.JSON(http.StatusPartialContent, "DNA tidak valid")
	}

	results, err := Db.Query("SELECT DNA_Penyusun FROM jenis_penyakit WHERE Nama_Penyakit = ?", sakit)
	if err != nil {
		return c.String(http.StatusPartialContent, "Penyakit belum ada")
	}

	var res string
	results.Next()
	results.Scan(&res)

	if !kmp {
		hasiltest := handlers.BooyerMoore(res, dna)
		if hasiltest {
			status = "True"
		} else {
			status = "False"
		}
	} else {
		hasiltest := handlers.KMP(res, dna)
		if hasiltest == -1 {
			status = "False"
		} else {
			status = "True"
		}

	}

	fmt.Println(nama, dna, sakit, date)
	// err = Db.Ping()
	// if err != nil {
	// 	fmt.Println("Database connection error")
	// 	panic(err.Error())
	// 	return err
	// }

	Db.Query("INSERT INTO hasil_prediksi (Tanggal_Prediksi, Nama_Pasien, Penyakit_Prediksi	,Status_Terprediksi) VALUES (?, ?, ?, ?)", tanggal, nama, sakit, status)

	return c.JSON(http.StatusOK, cekDna{nama, dna, sakit, date, status})
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

	tanggal := body["caritanggal"].(string)
	sakit := body["caripenyakit"].(string)

	var hasil []pencarian

	var date string
	var nama string
	var penyakit string
	var status string

	switch {

	case (tanggal == "" && sakit == ""):
		return c.String(http.StatusPartialContent, "Harap isi salah satu")

	case (tanggal == "" && sakit != ""):
		rows, err := Db.Query("SELECT * FROM hasil_prediksi WHERE Penyakit_Prediksi = ?", sakit)
		if err == sql.ErrNoRows {
			return c.String(http.StatusPartialContent, "Tidak ada data")
		}
		for rows.Next() {
			rows.Scan(&date, &nama, &penyakit, &status)
			hasil = append(hasil, pencarian{date, nama, penyakit, status})
		}

	case (tanggal != "" && sakit == ""):
		rows, err := Db.Query("SELECT * FROM hasil_prediksi WHERE Tanggal_Prediksi = ?", tanggal)
		if err == sql.ErrNoRows {
			return c.String(http.StatusPartialContent, "Tidak ada data")
		}
		for rows.Next() {
			rows.Scan(&date, &nama, &penyakit, &status)
			hasil = append(hasil, pencarian{date, nama, penyakit, status})

		}

	case (tanggal != "" && sakit != ""):
		rows, err := Db.Query("SELECT * FROM hasil_prediksi WHERE Tanggal_Prediksi = ? AND Penyakit_Prediksi = ?", tanggal, sakit)
		if err == sql.ErrNoRows {
			return c.String(http.StatusPartialContent, "Tidak ada data")
		}
		for rows.Next() {
			rows.Scan(&date, &nama, &penyakit, &status)
			hasil = append(hasil, pencarian{date, nama, penyakit, status})
		}
	}

	return c.JSON(http.StatusOK, hasil)
}
