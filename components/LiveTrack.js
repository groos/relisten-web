import Link from 'next/link'
import TimeAgo from 'react-timeago'

import { splitShowDate } from '../lib/utils';

const createURL = (track) => {
  const { year, month, day } = splitShowDate(track.source.display_date);

  return '/' + [
    track.source.artist.slug,
    year,
    month,
    day,
    track.track.slug
  ].join('/') + `?source=${track.source.id}`;
}

const getVenueInfo = (track) => {
  if (track.source.artist && track.source.artist.features) {
    if (track.source.artist.features.per_show_venues && track.source.artist.features.per_source_venues) {
      return track.source.show.venue;
    }
  
    if (track.source.artist.features.per_show_venues) {
      return track.source.show.venue;
    }
  
    return track.source.venue;
  }
}

const VenueInfo = ({ track }) => {
  var info = getVenueInfo(track);
  return info ? <div>
    <div>{info.name}</div>
    <div>{info.location}</div>
  </div> : null;
}

// shorten date
const formatterFn = (value, unit, suffix) => value + unit.slice(0, 1)

export default ({ app_type_description = '', created_at, track } = {}) => !track || !track.track ? null : (
  <Link href="/" as={createURL(track)}>
    <div className="container">
      
    <div className="info">
        <div className="app-info">
          {app_type_description}
          &nbsp;
          <span className="time-ago">
            <TimeAgo
              date={created_at}
              formatter={formatterFn}
            />
          </span>
        </div>
      </div>

      <div>
        <div className="song-title">
          {track.track.title}
        </div>
        <div className="artist-name">
          {track.source.artist.name} 
        </div>
        <div className="subtext">
        <div className="date">{new Date(track.source.display_date).toLocaleDateString()}</div>
          <VenueInfo track={track} />
        </div>
      </div>

      

      <div className="listen">Listen >></div>

      <style jsx>{`
        .container
          width 100%
          display flex
          flex-direction row
          padding 30px
          border-bottom 1px solid #eee
          cursor pointer
          &:hover
            -webkit-transition: all 1s
            transition: all 1s

            .listen
              text-decoration: underline;
         
        .song-title {
          font-weight: bold;
        }    

        .artist-name {
          margin-bottom: 15px;
        }

        .info
          margin-right 50px
          margin-bottom: 10px;

        .content, .date
          font-weight bold

        .subtext
          //background-color: #979797
          color: black;
          padding: 10px 0 10px 0;
          border-radius: 5px;
          font-size: 125x;

        .listen
          font-size: 25px;
          margin-left auto
          align-self center

        .app-info
          display flex
          justify-content space-between

        .time-ago
          width: 50px
          opacity 0.7

        .live-track-enter {
          background: #3DCC91;
        }

        .live-track-enter.live-track-enter-active {
          background: transparent;
          transition: background 6500ms ease-in;
        }
      `}</style>
    </div>
  </Link>
)
