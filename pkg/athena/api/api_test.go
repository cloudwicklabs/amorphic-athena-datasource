package api

import (
	"context"
	"testing"

	"github.com/google/go-cmp/cmp"
	athenaclientmock "github.com/grafana/athena-datasource/pkg/athena/api/mock"
)

func TestConnection_ListDataCatalogs(t *testing.T) {
	expectedCatalogs := []string{"foo"}
	c := &API{Client: &athenaclientmock.MockAthenaClient{Catalogs: expectedCatalogs}}
	catalogs, err := c.ListDataCatalogs(context.TODO())
	if err != nil {
		t.Fatalf("unexpected error %v", err)
	}
	if !cmp.Equal(expectedCatalogs, catalogs) {
		t.Errorf("unexpected result: %v", cmp.Diff(expectedCatalogs, catalogs))
	}
}