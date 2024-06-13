import MaterialSymbolsPlayCircleOutline from '~icons/material-symbols/play-circle-outline'

export function Player() {
  return (
    <div className="fixed bottom-0 bg-yellow-400 right-0 left-0  flex p-3">
      <div className="flex">
        <div className="rounded-full bg-gray-500 h-12 w-12"></div>
        <div className="flex flex-col ml-4 h-12 justify-between">
          <p className="text-lg font-bold">f*** xxx***</p>
          <p className="text-xs">张三</p>
        </div>

        <div>
          <MaterialSymbolsPlayCircleOutline fontSize="2em"></MaterialSymbolsPlayCircleOutline>
        </div>
      </div>
    </div>
  )
}
