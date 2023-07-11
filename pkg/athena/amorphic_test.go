package athena

// import (
// 	"fmt"
// 	"net/http"
// 	"net/http/httptest"
// 	"strings"
// 	"testing"

// 	"github.com/aws/aws-sdk-go/aws/awserr"
// 	"github.com/stretchr/testify/assert"
// )

// func createMockServer(responseCode int, responseBody string) *httptest.Server {
// 	return httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		w.WriteHeader(responseCode)
// 		fmt.Fprint(w, responseBody)
// 	}))
// }

// func TestAmorphicCustomCredentialsProvider_GetCredentials_Success(t *testing.T) {
// 	// Create a mock server to simulate the API response
// 	mockServer := createMockServer(200, `{"iam-credentials": {"AwsAccessKey": "access_key", "AwsSecretKey": "secret_key", "SessionToken": "session_token"}}`)
// 	defer mockServer.Close()

// 	// Create a new instance of AmorphicCustomCredentialsProvider
// 	provider := NewAmorphicCustomCredentialsProvider(mockServer.URL, "pat_token", "role_id")

// 	// Call the GetCredentials method
// 	creds, err := provider.GetCredentials()

// 	// Assert that no error occurred
// 	assert.Nil(t, err, "expecting no error")
// 	fmt.Println(err)
// 	fmt.Println(creds)

// 	if err == nil {
// 		// Assert the expected credentials
// 		assert.Equal(t, "access_key", *creds.AccessKeyId)
// 		assert.Equal(t, "secret_key", *creds.SecretAccessKey)
// 		assert.Equal(t, "session_token", *creds.SessionToken)
// 	}
// }

// func TestAmorphicCustomCredentialsProvider_GetCredentials_Error(t *testing.T) {
// 	// Create a mock server to simulate the API response
// 	mockServer := createMockServer(500, `{"Message": "Some error message"}`)
// 	defer mockServer.Close()

// 	// Create a new instance of AmorphicCustomCredentialsProvider
// 	provider := NewAmorphicCustomCredentialsProvider(mockServer.URL, "pat_token", "role_id")

// 	// Call the GetCredentials method
// 	_, err := provider.GetCredentials()
// 	fmt.Println("GetCredentialsErr:", err)

// 	// Assert the expected error
// 	expectedErr := awserr.New("500", "ADP-GE-1101 ERROR: Some error message ADP-ATHENACONNECTOR-", nil)
// 	assert.True(t, strings.HasPrefix(err.Error(), expectedErr.Error()))
// }
