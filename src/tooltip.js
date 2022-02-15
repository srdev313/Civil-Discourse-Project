export const DivisiveTweetToolTip = ({ small = false, style }) => {
  return (
    <div className={`section-title ${small && 'small'}`} style={style}>
      Divisive Tweets
      <div className="custom-tooltip">
        ?
        <div className="tooltip-container">
          <p className="mb-2">There are five types of divisive language:</p>
          <div className="mb-2">
            <span style={{ fontWeight: 'bold' }}>“Us vs. them” framing</span>
            &nbsp;-&nbsp;Accusing others of nefarious intentions and framing
            them as the enemy
          </div>
          <div className="mb-2">
            <span style={{ fontWeight: 'bold' }}>Tribalism</span>
            &nbsp;-&nbsp;Judging a policy based on who is associated with it,
            rather than on its merits
          </div>
          <div className="mb-2">
            <span style={{ fontWeight: 'bold' }}>Labeling</span>
            &nbsp;-&nbsp;Applying a label to a policy to induce a judgment about
            it without assessing its benefits or drawbacks (e.g. socialist,
            racist)
          </div>
          <div className="mb-2">
            <span style={{ fontWeight: 'bold' }}>Trigger words</span>
            &nbsp;-&nbsp;Using specific words designed to trigger an emotional
            response and stoke outrage
          </div>
        </div>
      </div>
    </div>
  )
}

export const RatingToolTip = () => {
  return (
    <div className="section-title">
      Rating
      <div className="custom-tooltip">
        ?
        <div className="tooltip-container rating-tooltip">
          <table>
            <thead>
              <tr>
                <th>Rating</th>
                <th>Score</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>AAA</td>
                <td>96-100</td>
                <td>Extremely civil</td>
              </tr>
              <tr>
                <td>AA</td>
                <td>86-95</td>
                <td>Very civil</td>
              </tr>
              <tr>
                <td>A</td>
                <td>81-85</td>
                <td>Civil</td>
              </tr>
              <tr>
                <td>BBB</td>
                <td>76-80</td>
                <td>Fairly civil, but close to being divisive</td>
              </tr>
              <tr>
                <td>BB</td>
                <td>66-75</td>
                <td>Borderline</td>
              </tr>
              <tr>
                <td>B</td>
                <td>61-65</td>
                <td>More divisive than civil</td>
              </tr>
              <tr>
                <td>CCC</td>
                <td>56-60</td>
                <td>Divisive</td>
              </tr>
              <tr>
                <td>CC</td>
                <td>46-55</td>
                <td>Very divisive</td>
              </tr>
              <tr>
                <td>C</td>
                <td>41-45</td>
                <td>Highly divisive</td>
              </tr>
              <tr>
                <td>D</td>
                <td>20-40</td>
                <td>Extremely divisive</td>
              </tr>
              <tr>
                <td>F</td>
                <td>0-19</td>
                <td>Toxic divisiveness</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
