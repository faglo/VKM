package vkapi

type audio struct {
	ID       int    `json:"id"`
	OwnerID  int    `json:"owner_id"`
	Artist   string `json:"artist"`
	Title    string `json:"title"`
	Duration *int   `json:"duration"`
	URL      string `json:"url"`
}

func (c *Client) AudioByID(audios ...string) ([]audio, error) {
	response, err := request[[]audio]("audio.getById", params{
		"audios":       audios,
		"access_token": c.Token,
	})
	if err != nil {
		return nil, err
	}
	return *response, nil
}
