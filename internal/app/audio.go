package app

import (
	"fmt"

	"github.com/faglo/vkm/internal/vkapi"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func (a *Application) Search(query string) ([]*vkapi.Audio, error) {
	return a.api.AudioSearch(query)
}

func (a *Application) Play(id string) (*vkapi.Audio, error) {
	audio, err := a.api.AudioByID(id)
	if err != nil {
		return nil, err
	}

	if len(audio) == 0 {
		return nil, fmt.Errorf("audio not found")
	}

	if err = a.play(audio[0].URL); err != nil {
		return nil, err
	}

	runtime.EventsEmit(a.ctx, "update-song", map[string]any{
		"artist": audio[0].Artist,
		"title":  audio[0].Title,
		"cover":  audio[0].Album.Thumb.Photo135,
	})

	return audio[0], nil
}
