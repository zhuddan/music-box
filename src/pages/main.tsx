import { Player } from '../components/player'

function List() {
  return Array.from({
    length: 100,
  }).map((_, index) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <li key={`${index}.`}>
        1300 + index
      </li>
    )
  })
}

export default function Main() {
  return (
    <div className="  ">
      <div className="flex-1">
        <List></List>
      </div>
      <Player></Player>
    </div>
  )
}
