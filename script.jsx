class Header extends React.Component {
    render() {
        return (
          <div className={'header-container py-3'}>
              <span className={'arrow mr-3'}><i className={"fas fa-arrow-left"}></i></span>
              <span className={"name"}>{this.props.name.toUpperCase()}</span>
              <span className={'star ml-1'}><i className="fas fa-certificate"></i></span>
          </div>
        );
    }
}

class Action extends React.Component {
    render() {
        return (
            <div className={'action-container'}>
                <div className={'action-btn1  mx-4'}><span className={'action-text py-3'}>Tweets</span></div>
                <div className={'action-btn2 '}><span className={'action-text py-3'}>Tweets & replies</span></div>
                <div className={'action-btn '}><span className={'action-text py-3'}>Media</span></div>
                <div className={'action-btn '}><span className={'action-text py-3'}>Likes</span></div>
            </div>
        )
    }
}

class IndividualTweet extends React.Component {
    render() {
        //time
        var now = new Date();
        var tweetdate= new Date(this.props.tweet.created_at)
        var timeDifference = Math.floor(Math.abs(now-tweetdate)/36e5)

        //text
        var text = this.props.tweet.text;
        var tweetText = text.split(" ").map( (text,index) => {
            if (this.props.tweet.entities.urls.length !== 0) {
                if (text === this.props.tweet.entities.urls[0].url) {
                    return <a key={index} href={this.props.tweet.entities.urls[0].url}>{text + " "} </a>
                }
            }

            if (this.props.tweet.entities.user_mentions.length !== 0){
                if (text.substr(1) === this.props.tweet.entities.user_mentions[0].screen_name) {
                    return <span key={index} className = {'symbol'}>{text+" "}</span>
                }
            }

            return <span key={index}>{text + " "} </span>
        });

        return (
            <div className={"individual-container py-3"}>
                <div className={'profile-img-container mx-3'} style={{backgroundImage:`url(${this.props.tweet.user.profile_image_url})`}}> </div>
                <div className={'profile-text-container'}>
                    <div className={'user-details'}>
                        <span className={'name '}>{this.props.tweet.user.name.toUpperCase()}</span>
                        <span className={'star mx-2'}><i className="fas fa-certificate"></i></span>
                        <span className={'symbol'}>@{this.props.tweet.user.screen_name}</span>
                        <span className={'dot mx-2'}>•</span>
                        <span className={'time'}> {timeDifference}h</span>
                    </div>
                    <div className={'user-details-arrow'}>
                        <span><i className="fas fa-chevron-down"></i></span>
                    </div>
                    <div className={'tweet-text'}>
                        <p>{tweetText}</p>
                    </div>
                    <div className={'profile-button-container'}>
                        <span className={'comment'}><i class="far fa-comment"></i> 352</span>
                        <span className={'retweet'}><i class="fas fa-retweet"></i> {this.props.tweet.retweet_count}</span>
                        <span className={'likes'}><i class="far fa-heart"></i> {this.props.tweet.favorite_count}</span>
                    </div>
                    <div className={'profile-upload-container'}>
                        <span className={'upload'}><i class="fas fa-upload"></i></span>
                    </div>
                </div>
            </div>
        )
    }
}

class TweetMainContainer extends React.Component {
    render(){
        let tweets = this.props.tweets.map( (tweet,index) => {
            return <IndividualTweet tweet={tweet} key={index} />
        })

        return (
            <div className="maint-container">
                {tweets}
            </div>
        )
    }
}

ReactDOM.render(
    <div className={"container"}>
      <div className = {"row"}>
        <div className = {"offset-3 col-6"}>
            <Header name={tweets[0].user.name} />
            <Action />
            <TweetMainContainer tweets={tweets} />
        </div>
      </div>
    </div>,
    document.getElementById('root')
);
