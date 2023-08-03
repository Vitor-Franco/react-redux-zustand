import * as Collapsible from "@radix-ui/react-collapsible";

import { ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store";
import { play } from "../store/slices/player";
import { Lesson } from "./Lesson";

type ModuleProps = {
  title: string;
  amountOfLessons: number;
  moduleIndex: number;
};

export function Module({ amountOfLessons, title, moduleIndex }: ModuleProps) {
  const dispatch = useAppDispatch();

  const { currentModuleIndex, currentLessonIndex } = useAppSelector((state) => {
    const { currentModuleIndex, currentLessonIndex } = state.player;

    return { currentModuleIndex, currentLessonIndex };
  });

  const lessons = useAppSelector(
    (state) => state.player.course?.modules[moduleIndex].lessons
  );

  function handlePlayLesson(lessonIndex: number) {
    dispatch(play([moduleIndex, lessonIndex]));
  }

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex items-center w-full gap-3 p-4 bg-zinc-800">
        <div className="flex items-center justify-center w-10 h-10 text-xs rounded-full bg-zinc-950">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons?.map((lesson, lessonIndex) => {
            const isCurrent =
              currentModuleIndex === moduleIndex &&
              currentLessonIndex === lessonIndex;

            return (
              <Lesson
                title={lesson.title}
                duration={lesson.duration}
                key={lesson.id}
                onPlay={() => handlePlayLesson(lessonIndex)}
                isCurrent={isCurrent}
              />
            );
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
