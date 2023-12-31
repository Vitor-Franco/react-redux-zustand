import ReactPlayer from "react-player";
import { Loader } from "lucide-react";
import { useCurrentLesson, useStore } from "../zustand-store";

type VideoProps = {};

export function Video(props: VideoProps) {
  const { currentLesson } = useCurrentLesson();
  const { isLoading, next } = useStore(store => ({
    isLoading: store.isLoading,
    next: store.next
  }));

  function handlePlayNext() {
    next();
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
          onEnded={handlePlayNext}
          playing
        />
      )}
    </div>
  );
}
