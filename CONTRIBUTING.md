# Building and releasing

## How to build the Athena data source plugin locally

## Dependencies

Make sure you have the following dependencies installed first:

- [Git](https://git-scm.com/)
- [Go](https://golang.org/dl/) (see [go.mod](../go.mod#L3) for minimum required version)
- [Mage](https://magefile.org/)
- [Node.js (Long Term Support)](https://nodejs.org)
- [Yarn](https://yarnpkg.com)

## Frontend

1. Install dependencies

   ```bash
   yarn install --pure-lockfile
   ```

2. Build plugin in development mode or run in watch mode

   ```bash
   yarn dev
   ```

   or

   ```bash
   yarn watch
   ```

3. Build plugin in production mode

   ```bash
   yarn build
   ```

## Backend

1. Build the backend binaries

   ```bash
   mage -v
   ```

## Build a release for the Athena data source plugin

### Pre-requisites

Before doing a release, make sure that the GitHub repository is configured with a `GRAFANA_API_KEY` to be able to sign the plugin and that the Golang and Node versions in the [release.yaml](./.github/workflows/release.yaml) workflow are correct.

Also, make sure that the path to the plugin validator in the [release.yaml](./.github/workflows/release.yaml#L122) is correct (this fixes the error `pushd: ./plugin-validator/cmd/plugincheck: No such file or directory`):

```
pushd ./plugin-validator/pkg/cmd/plugincheck`
```

### Release

You need to have commit rights to the GitHub repository to publish a release.

1. Update the version number in the `package.json` file.
2. Update the `CHANGELOG.md` with the changes contained in the release.
3. Commit the changes to master and push to GitHub.
4. Create a tag locally that follows the convention v(major).(minor).x, leaving the patch as `x`. For example:

   ```bash
   git tag v3.3.0
   ```

5. Push the new tag to GitHub

   ```bash
   git push origin main --tags
   ```

6. This triggers the [release pipeline on GitHub](https://github.com/grafana/athena-datasource/actions/workflows/release.yml).
7. Update the plugin reference in the [grafana-plugin-repository](https://github.com/grafana/grafana-plugin-repository/blob/master/repo.json)/
8. Check that the release is published to [grafana.com](https://grafana.com/grafana/plugins/athena-datasource).
9. Test the published version of the plugin either locally or on a Hosted Grafana instance.