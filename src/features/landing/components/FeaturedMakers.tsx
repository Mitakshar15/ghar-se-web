import { useQuery } from '@tanstack/react-query';
import { BadgeCheck, MapPin, Star } from 'lucide-react';

import { apiGet } from '@/lib/api/client';
import { API } from '@/lib/api/endpoints';
import { qk } from '@/lib/api/queryClient';
import { Skeleton } from '@/components/ui/Skeleton';

interface FeaturedMaker {
  id: string;
  name: string;
  owner: string;
  location: string;
  rating: number;
  reviews: number;
  years: number;
  speciality: string;
  image: string;
  imageBg: string;
}

interface Response {
  makers: FeaturedMaker[];
}

export function FeaturedMakers() {
  const { data, isLoading } = useQuery({
    queryKey: qk.featuredMakers,
    queryFn: () => apiGet<Response>(API.publicFeaturedMakers),
  });

  return (
    <section id="makers" className="py-24 md:py-32" style={{ background: '#FBF7F0' }}>
      <div className="mx-auto max-w-page px-5 md:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
          <div>
            <div className="mb-3 text-[11px] font-extrabold tracking-[0.25em] text-saffron uppercase">
              Featured kitchens
            </div>
            <h2 className="font-display text-[40px] leading-[1.05] font-black tracking-tight text-ink md:text-[60px]">
              The aunties of <span className="font-serif-italic text-green">Sirsi</span>.
            </h2>
          </div>
          <p className="max-w-[300px] text-[13px] text-ink-2">
            Three of 47 verified makers. Each cooks from her home in Sirsi — generations of recipe, not factory
            scale.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5]" />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {data?.makers.map((m) => (
              <div key={m.id} className="overflow-hidden rounded-3xl border border-line bg-canvas hover-lift">
                <div
                  className="flex aspect-[4/3] items-center justify-center text-[120px]"
                  style={{ background: m.imageBg }}
                >
                  {m.image}
                </div>
                <div className="p-5">
                  <div className="mb-1 flex items-center gap-1.5">
                    <h3 className="font-display text-[22px] font-black tracking-tight text-ink">{m.name}</h3>
                    <BadgeCheck className="size-4 text-green" fill="#0B5D4D" strokeWidth={0} />
                  </div>
                  <div className="text-[12px] text-ink-2">{m.speciality}</div>
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-[11px] text-ink-2">
                    <div className="flex items-center gap-1">
                      <Star className="size-3 fill-veg text-veg" strokeWidth={0} />
                      <span className="font-extrabold text-ink">{m.rating}</span>
                      <span>· {m.reviews}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="size-3" strokeWidth={2.2} />
                      <span>{m.location}</span>
                    </div>
                    <div>{m.years}y</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
