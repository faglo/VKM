package vkapi

// Audio represents a VK audio
type Audio struct {
	ID       int    `json:"id"`
	OwnerID  int    `json:"owner_id"`
	Artist   string `json:"artist"`
	Title    string `json:"title"`
	Duration *int   `json:"duration"`
	URL      string `json:"url"`
	Album    *Album `json:"album"`
}

// AlbumThumbnail represents a VK album
type Album struct {
	ID      int             `json:"id"`
	Title   string          `json:"title"`
	OwnerID int             `json:"owner_id"`
	Thumb   *AlbumThumbnail `json:"thumb"`
}

// AlbumThumbnail contains URL to album thumbnails
type AlbumThumbnail struct {
	Photo34  string `json:"photo_34"`
	Photo68  string `json:"photo_68"`
	Photo135 string `json:"photo_135"`
	Photo270 string `json:"photo_270"`
	Photo300 string `json:"photo_300"`
	Photo600 string `json:"photo_600"`
	Photo800 string `json:"photo_800"`
}

// AudioSearch returns audios by search query
func (c *Client) AudioSearch(query string) ([]*Audio, error) {
	response, err := request[listResponse[Audio]]("audio.search", params{
		"auto_complete": 1,
		"q":             query,
		"access_token":  c.Token,
	})
	if err != nil {
		return nil, err
	}
	return response.Items, nil
}

// AudioByID returns audios by ID
func (c *Client) AudioByID(audios ...string) ([]*Audio, error) {
	response, err := request[[]*Audio]("audio.getById", params{
		"audios":       audios,
		"access_token": c.Token,
	})
	if err != nil {
		return nil, err
	}
	return *response, nil
}
