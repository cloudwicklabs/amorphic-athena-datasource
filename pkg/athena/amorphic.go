package athena

// import (
// 	"encoding/json"
// 	"fmt"
// 	"io/ioutil"
// 	"net/http"
// 	"regexp"

// 	"github.com/aws/aws-sdk-go/aws/awserr"
// 	"github.com/aws/aws-sdk-go/service/sts"
// 	"github.com/google/uuid"
// 	"github.com/pkg/errors"
// )

// type AmorphicCreds struct {
// 	Message        string `json:"Message"`
// 	IAMCredentials struct {
// 		AwsAccessKey string `json:"AwsAccessKey"`
// 		AwsSecretKey string `json:"AwsSecretKey"`
// 		SessionToken string `json:"SessionToken"`
// 	} `json:"iam-credentials"`
// }

// type AmorphicCustomCredentialsProvider struct {
// 	amorphicGatewayURL string
// 	amorphicPatToken   string
// 	amorphicRoleId     string
// 	assumedCredentials sts.Credentials
// 	ase                awserr.Error
// 	responseCode       int
// }

// func NewAmorphicCustomCredentialsProvider(amorphicGatewayURL string, amorphicPatToken string, amorphicRoleId string) *AmorphicCustomCredentialsProvider {
// 	return &AmorphicCustomCredentialsProvider{
// 		amorphicGatewayURL: amorphicGatewayURL,
// 		amorphicPatToken:   amorphicPatToken,
// 		amorphicRoleId:     amorphicRoleId,
// 	}
// }

// func (cp *AmorphicCustomCredentialsProvider) GetCredentials() (sts.Credentials, error) {
// 	if err := cp.Refresh(); err != nil {
// 		return cp.assumedCredentials, err
// 	}
// 	return cp.assumedCredentials, cp.ase
// }

// func (cp *AmorphicCustomCredentialsProvider) Refresh() error {
// 	jsonString, err := cp.getCredentialsFromAmorphicAPI(cp.amorphicGatewayURL, cp.amorphicPatToken, cp.amorphicRoleId)
// 	if err != nil {
// 		fmt.Println("Error:", err)
// 		return err
// 	}
// 	fmt.Println("jsonString:", jsonString)

// 	var amorphicCreds AmorphicCreds

// 	// Parse the JSON data into the person variable
// 	err = json.Unmarshal([]byte(jsonString), &amorphicCreds)
// 	if err != nil {
// 		return errors.Wrap(err, "failed to parse the amorphic json")
// 	}

// 	if amorphicCreds.Message != "" {
// 		uuid := uuid.New().String()
// 		message := amorphicCreds.Message
// 		cp.ase = awserr.New(fmt.Sprintf("%v", cp.responseCode), "ADP-GE-1101 ERROR: "+message+" "+fmt.Sprintf("ADP-ATHENACONNECTOR-%s", uuid), nil)
// 		return cp.ase.OrigErr()
// 	} else {
// 		awsAccessKey := amorphicCreds.IAMCredentials.AwsAccessKey
// 		awsSecretKey := amorphicCreds.IAMCredentials.AwsSecretKey
// 		sessionToken := amorphicCreds.IAMCredentials.SessionToken
// 		cp.assumedCredentials = sts.Credentials{AccessKeyId: &awsAccessKey, SecretAccessKey: &awsSecretKey, SessionToken: &sessionToken}
// 	}
// 	return err
// }

// func (cp *AmorphicCustomCredentialsProvider) getCredentialsFromAmorphicAPI(amorphicGatewayURL string, amorphicPatToken string, amorphicRoleId string) (string, error) {
// 	matched, _ := regexp.MatchString(`^https?://.+`, amorphicGatewayURL)
// 	if !matched {
// 		amorphicGatewayURL = "https://" + amorphicGatewayURL
// 	}
// 	url := amorphicGatewayURL + "/athena-session-credentials"
// 	fmt.Println("Sending GET request to athena-session-credentials API:", url)

// 	req, err := http.NewRequest("GET", url, nil)
// 	if err != nil {
// 		return "", err
// 	}

// 	req.Header.Add("Authorization", amorphicPatToken)
// 	req.Header.Add("role_id", amorphicRoleId)
// 	req.Header.Add("Content-Type", "application/json")

// 	client := http.Client{}
// 	resp, err := client.Do(req)
// 	if err != nil {
// 		return "", err
// 	}
// 	defer resp.Body.Close()

// 	cp.responseCode = resp.StatusCode
// 	fmt.Println("Response code from athena-session-credentials API:", cp.responseCode)

// 	var body []byte
// 	if 100 <= cp.responseCode && cp.responseCode <= 399 {
// 		body, err = ioutil.ReadAll(resp.Body)
// 		if err != nil {
// 			return "", err
// 		}
// 	} else {
// 		body, err = ioutil.ReadAll(resp.Body)
// 		if err != nil {
// 			return "", err
// 		}
// 	}

// 	jsonString := string(body)
// 	return jsonString, nil
// }
