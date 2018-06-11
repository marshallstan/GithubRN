export default class TrendingRepoModel {
    constructor(fullName, url, description, language, meta, contributors, contributorsUrl, starCount, forkCount) {
        this.fullName = fullName;
        this.url = url;
        this.description = description;
        this.language = language;
        this.meta = meta;
        this.contributors = contributors;
        this.contributorsUrl = contributorsUrl;
        this.starCount = starCount;
        this.forkCount = forkCount;
    }
}
