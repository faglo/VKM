package vkapi

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
)

type (
	params map[string]any
)

type response[T any] struct {
	Error    *apiError `json:"error"`
	Response *T        `json:"response"`
}

type apiError struct {
	Code    int    `json:"error_code"`
	Message string `json:"error_msg"`
}

func (e *apiError) Error() string {
	return fmt.Sprintf("vkapi: %s - #%d", e.Message, e.Code)
}

func request[T any](method string, params params) (*T, error) {
	// Convert params to url.Values
	values := url.Values{"v": {API_VERSION}}
	for key, value := range params {
		s, err := toString(value)
		if err != nil {
			return nil, err
		}
		values.Add(key, s)
	}

	// Make request
	resp, err := http.PostForm(BASE_URL+method, values)
	if err != nil {
		return nil, err
	}

	// Parse response
	var response response[T]
	if err = json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return nil, err
	}

	// Check for error
	if response.Error != nil {
		return nil, response.Error
	}

	return response.Response, nil
}
