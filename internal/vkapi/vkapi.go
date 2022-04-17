package vkapi

const (
	BASE_URL    = "https://api.vk.com/method/"
	API_VERSION = "5.123"
)

// Client is used to make authorized requests to VK API
type Client struct {
	Token string
}

// NewClient creates a new Client with the given token
func NewClient(token string) *Client {
	return &Client{token}
}
