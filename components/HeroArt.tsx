/** CSS 插畫：路徑 + 雙層 panel。大小調 `globals.css` 的 `--hero-art-*` */
export function HeroArt() {
  return (
    <div className="hero-art" aria-label="Layered interface paths illustration" role="img">
      <div className="art-grid" aria-hidden />
      <div className="art-path art-path-one" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="art-path art-path-two" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="art-panel art-panel-back">
        <span className="art-panel-label">SYSTEM / 01</span>
        <strong>
          clear
          <br />
          by design
        </strong>
      </div>
      <div className="art-panel art-panel-front">
        <span className="art-panel-label">MCH / BUILDING</span>
        <div className="art-bars" aria-hidden>
          <i />
          <i />
          <i />
        </div>
        <div className="art-panel-footer">
          <span>product thinking</span>
          <span aria-hidden>↗</span>
        </div>
      </div>
      <div className="art-node art-node-top" aria-hidden />
      <div className="art-node art-node-bottom" aria-hidden />
    </div>
  )
}
