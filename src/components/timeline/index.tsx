import { apodTimeline } from '@/services/planetary'
import { formatToUI } from '@/utils/format-to-ui'
import { TimelineItem } from '../timeline-item'
import { v4 } from 'uuid'

type TimelineProps = {
  date: string
}

export const Timeline = async ({ date }: TimelineProps) => {
  const timeline = await apodTimeline(date)

  return (
    <section className="mx-auto max-w-4xl">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mx-4 grid gap-4 sm:grid-cols-12">
          <aside className="relative col-span-12 sm:col-span-3">
            <div className="sticky top-4 mb-14 text-center before:mx-auto before:mb-5 before:block before:h-3 before:w-24 before:rounded-sm before:dark:bg-muted sm:text-left sm:before:mx-0">
              <h2 className="text-2xl font-semibold">
                {formatToUI(new Date(date), 'MMMM,')} <br />
                {formatToUI(new Date(date), 'd') + 'th'}
              </h2>
            </div>
          </aside>

          <article className="relative col-span-12 space-y-6 px-4 sm:col-span-9">
            <div className="relative col-span-12 space-y-12 px-4 before:dark:bg-muted sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:-left-3 sm:before:bottom-0 sm:before:top-2 sm:before:w-0.5">
              {timeline.map((item) => (
                <TimelineItem item={item} key={v4()} />
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
