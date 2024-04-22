import { Separator } from "./ui/separator"
export const ColumnTitle = () => {
  return (
    <div className="w-full flex flex-col text-xs text-gray-400">
      <div className="flex flex-row justify-between mb-2">
        <div className="flex flex-row">
          <p className="ml-2">#</p>
          <p className="ml-3">Song</p>
        </div>
        <p className="mr-3">Album</p>
      </div>
      <Separator className="bg-gray-700" orientation="horizontal" />
    </div>
  )
}