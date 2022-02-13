import React, { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { colorA, colorB, colorC, pcnt, ratings, defaultName } from './constants'
import userLogo from './images/avatar.png'
import animalImg from './images/elephant.png'
import loadingSVG from './images/Preloader.svg'
import useGoogleSheets from 'use-google-sheets'
import { apiKey, sheetId } from './constants'
import { Line } from 'react-chartjs-2'
import { DivisiveTweetToolTip, RatingToolTip } from './tooltip'
import moment from 'moment'

const Main = () => {
  let [searchParams] = useSearchParams()
  const [divisiveTweets, setDivisiveTweets] = useState(null)
  const [scoreHistory, setScoreHistory] = useState([null])
  const [politician, setPolitician] = useState(null)
  const [twitterHandles, setTwitterHandles] = useState(null)
  const [resultColor, setResultColor] = useState([0, 0, 0])
  const [label, setLabel] = useState('')
  const [chartData, setChartData] = useState(null)
  const ref = useRef(null)
  const { data, loading, error } = useGoogleSheets({
    apiKey,
    sheetId,
  })

  useEffect(() => {
    if (!loading && !error) {
      const name = searchParams.get('name') ?? defaultName
      console.log(data)
      const divisiveTweets = data[0]?.data.filter(
        (item) => item['Politician'] === name,
      )
      const scoreHistory = data[1].data.filter(
        (item) => item['Politician'] === name,
      )
      const politician = data[2].data.find((item) =>
        name.includes(item['Politician']),
      )
      const twitterHandles = data[3].data.filter((item) =>
        name.includes(item['Politician']),
      )
      setDivisiveTweets(
        divisiveTweets
          ? divisiveTweets.map((divisiveTweet) => ({
              ...divisiveTweet,
              Us_vs_Them: Number(divisiveTweet.Us_vs_Them),
              Tribalism: Number(divisiveTweet.Tribalism),
              Labeling: Number(divisiveTweet.Labeling),
              Trigger_words: Number(divisiveTweet.Trigger_words),
            }))
          : null,
      )
      setScoreHistory(scoreHistory)
      setPolitician(politician)
      setTwitterHandles(twitterHandles)
      console.log(divisiveTweets, scoreHistory, politician, twitterHandles)

      if (politician && politician.Score) {
        let resultColor = [0, 0, 0]
        if (politician.Score < 50) {
          resultColor = colorA.map(function (color, i) {
            return (color + (politician.Score / 50) * (colorB[i] - color)) & 255
          })
        } else {
          resultColor = colorB.map(function (color, i) {
            return (color + ((politician.Score - 50) / 50) * (colorC[i] - color)) & 255
          })
        }
        const label = ratings.find(
          (rating) => rating.start <= politician.Score && politician.Score <= rating.end,
        ).label
        setResultColor(resultColor)
        setLabel(label)

        if (scoreHistory) {
          const history = scoreHistory.map((item) => {
            return { ...item, Date: moment(item.Date).format('MM/DD/YY') }
          })
          const chartData = {
            labels: history.map((item) => item.Date),
            datasets: [
              {
                label: 'My First dataset',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#29B637',
                borderColor: '#29B637',
                data: [
                  ...history.map((item) => ({
                    x: item.Date,
                    y: item.Score,
                  })),
                  { y: 100 },
                  { y: 0 },
                ],
              },
            ],
          }
          setChartData(chartData)
        }
      }
    }
  }, [data, loading, error, searchParams])

  const openLink = (link) => {
    console.log('hey')
    window.open(link, '_blank')
  }

  const options = {
    responsive: true,
    scales: {
      yAxes: [
        {
          display: true,
          stacked: true,
          ticks: {
            min: 0, // minimum value
            max: 100, // maximum value
          },
        },
      ],
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        titleAlign: 'center',
        titleFont: {
          size: '20',
        },
        bodyFont: {
          size: '14',
        },
        displayColors: false,
        callbacks: {
          label: function (context) {
            let label = ''
            if (context.label !== null) {
              label += context.label
            }
            return label
          },
          title: function (context) {
            let title = ''
            if (context[0].parsed.y !== null) {
              title += context[0].parsed.y + '%'
            }
            return title
          },
          labelPointStyle: function (a) {
            return null
          },
        },
      },
    },
  }

  return (
    <>
      {loading ? (
        <div className="loading">
          <img src={loadingSVG} alt="Loading..."></img>
        </div>
      ) : error ? (
        <h2>404 Error</h2>
      ) : (
        <div className="content container">
          <div className="personal-infos row m-0">
            <div className="personal-info col-12">
              <div className="personal-section row">
                <div className="avatar col-xxl-3 col-md-3">
                  {politician && (
                    <>
                      <img
                        className="user"
                        src={politician['Avatar URL']}
                        alt=""
                      />
                      <img className="animal" src={animalImg} alt="animal" />
                    </>
                  )}
                </div>
                <div className="col-xxl-3 col-md-4 d-flex flex-column info-first">
                  {politician && (
                    <>
                      <span className="tiny">
                        {politician.Branch}&nbsp;-&nbsp;{politician.State}
                      </span>
                      <h2 className="mb-1" style={{ fontWeight: 'bold' }}>
                        {politician.Politician}
                      </h2>
                      <span className="party mb-4 text-uppercase">{politician.Party}</span>
                      <span className="tiny mb-1">
                        {politician['Phone number']}
                      </span>
                      <span
                        className="twitter-link"
                        onClick={() => openLink(politician.Website)}
                      >
                        {politician.Website}
                      </span>
                    </>
                  )}
                </div>
                <div className="col-xxl-3 col-md-4">
                  {politician && twitterHandles && (
                    <>
                      <DivisiveTweetToolTip
                        small={true}
                        style={{ marginBottom: '5px' }}
                      />
                      <div className="align-items-end d-flex mb-1">
                        <h2 className="mb-0" style={{ fontWeight: 'bold' }}>
                          {politician.Pct_divisive}
                        </h2>
                        <span className="extra-tiny mb-1 ms-2">
                          {`${politician['Tweets assessed']} of ${politician['Tweets uploaded']} assessed`}
                        </span>
                      </div>
                      {twitterHandles.map((twitterHandle) => (
                        <div className="twitter-container d-flex flex-column py-2">
                          {twitterHandle && (
                            <span
                              className="twitter-link bold"
                              onClick={() =>
                                openLink(twitterHandle.Twitter_URL)
                              }
                            >
                              {twitterHandle !== null
                                ? '@' + twitterHandle['Twitter Handle']
                                : null}
                            </span>
                          )}
                          <span className="tiny">
                            {twitterHandle.Followers}
                            &nbsp;Followers,&nbsp;
                            {twitterHandle.Tweets}
                            &nbsp;Tweets
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
              {politician && (
                <div className="chart-container">
                  <div className="ratings">
                    <RatingToolTip />
                    <div
                      className="score"
                      style={{
                        color: `rgb(${resultColor[0]}, ${resultColor[1]}, ${resultColor[2]})`,
                      }}
                    >
                      {label}
                    </div>
                  </div>

                  <div className="chart">
                    <span
                      className="current-pcnt"
                      style={{ left: `${politician.Score}%` }}
                    >{`${politician.Score}%`}</span>
                    <div className="chart-description">
                      <span className="start">0%</span>
                      <span className="end">100%</span>
                    </div>
                    <div className="chart-lines">
                      <span className="gradient-line"></span>
                    </div>
                    <div className="chart-description">
                      <span className="start">Divisive</span>
                      <span className="end">Civil</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div ref={ref} className="scores-over-time">
            <div className="section-title mb-4">Score Over Time</div>
            <div
              style={{ position: 'relative', margin: 'auto', width: '100%' }}
            >
              {chartData && <Line data={chartData} options={options}></Line>}
            </div>
          </div>
          {divisiveTweets ? (
            <div className="panels">
              <DivisiveTweetToolTip />
              {divisiveTweets.map((divisiveTweet) => (
                <div className="comment-panel red">
                  <div className="avatar">
                    <span
                      className="twitter-link"
                      onClick={() => openLink(divisiveTweet['Tweet link'])}
                    >
                      {`@${divisiveTweet['Twitter handle']}`}
                    </span>
                    <span className="comment-date">
                      &nbsp;{`- ${divisiveTweet.Date}`}
                    </span>
                  </div>
                  <div className="comment">
                    <div className="description">{divisiveTweet.Text}</div>
                    <div className="tags">
                      {divisiveTweet.Us_vs_Them ? (
                        <span className="tag">Us vs. Them</span>
                      ) : null}
                      {divisiveTweet.Tribalism ? (
                        <span className="tag">Tribalism</span>
                      ) : null}
                      {divisiveTweet.Labeling ? (
                        <span className="tag">Labeling</span>
                      ) : null}
                      {divisiveTweet.Trigger_words ? (
                        <span className="tag">Trigger Words</span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </>
  )
}

export default Main
