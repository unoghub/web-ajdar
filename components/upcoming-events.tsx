import Image from "next/image";
import { CoverFlow } from "./ui/CoverFlow";

const Images = [
  {
    image:
      "https://instagram.fsaw1-14.fna.fbcdn.net/v/t51.82787-15/838985436_18343711039285466_6645160332769859366_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&_nc_map=urlgen_bucketless&ig_cache_key=NDAwMTMzMDkxMTk4NDY0MjQwMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTA4MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=XKUijsd_OCgQ7kNvwEjx6tG&_nc_oc=AdqsSmoCPUFk6b-UzbnYFbPbdxVNA1695s-Qd5wle9Tyic69fUgTXffVV7sIBAwctNE&_nc_zt=23&_nc_ht=instagram.fsaw1-14.fna&_nc_gid=U0PoS1gVzn6O0I-2T6fHjg&_nc_ss=7b2a8&oh=00_AQPuEpTBBbsicxkRvjW6lZO9W7kdELmlNrvXPGmX4Cx0hQ&oe=6AD11795",
    title: "Quiz n Drink",
    id: "Nature",
  },
  {
    image:
      "https://instagram.fsaw1-11.fna.fbcdn.net/v/t51.82787-15/825277296_18342410170285466_934964563628841605_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=108&_nc_map=urlgen_bucketless&ig_cache_key=Mzk5NTU2MjI0NzcwMDE0OTE2MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=i0rG212BmPQQ7kNvwERdOHL&_nc_oc=AdqzTtL2LNwIwD-CHzdOwKS44pj1btcE3K3cnUN-eqOkfR0eknkojO8HG7peDeHNVuI&_nc_zt=23&_nc_ht=instagram.fsaw1-11.fna&_nc_gid=U0PoS1gVzn6O0I-2T6fHjg&_nc_ss=7b2a8&oh=00_AQMulGxXwjSMMn1A0mxz3-YoBYkf81X9ztLYIoUKY-Y85Q&oe=6AD10600",
    title: "Sanat Gecesi",
    id: "Seascape",
  },
  {
    image:
      "https://instagram.fsaw1-14.fna.fbcdn.net/v/t51.82787-15/805485899_18341427490285466_7636671811394076646_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&_nc_map=urlgen_bucketless&ig_cache_key=Mzk5MTIxODc4MTc3NjAwNDQ4Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTM1MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=YQqrl1hTNCAQ7kNvwEfX4TU&_nc_oc=AdoCAYdhcdWR-4RK01QKb1uUJ_ni-asZbQQrpBnRig8zJlmw50PkpCsX-u-R5uFW4c4&_nc_zt=23&_nc_ht=instagram.fsaw1-14.fna&_nc_gid=U0PoS1gVzn6O0I-2T6fHjg&_nc_ss=7b2a8&oh=00_AQPI6lFyDoiiIE1QUMUUYb8LypLwCw_UrbTLU0zbic9lMw&oe=6AD0FF94",
    title: "Oyun Geliştirici Buluşması",
    id: "Woodland",
  },
  {
    image:
      "https://instagram.fsaw1-12.fna.fbcdn.net/v/t39.30808-6/785258173_1541818737980257_3926525703532141933_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&_nc_map=urlgen_bucketless&ig_cache_key=Mzk3MDE3NTcyNjI3NTk1NDA1OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTA4MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=RTehVXChXfQQ7kNvwGZ-Gvz&_nc_oc=AdqZU4Pw_IAIGkrQu0O3LIMEkMqA7-Ytuw44gxip3HWqUgbwhU-FClXKXX3xHCscRUk&_nc_zt=23&_nc_ht=instagram.fsaw1-12.fna&_nc_gid=U0PoS1gVzn6O0I-2T6fHjg&_nc_ss=7b2a8&oh=00_AQOzmE0GMkOH2Jcz107V0ABnAjSqKpViUb4sbeadtdMGvA&oe=6AD11DA4",
    title: "Playtest Günü",
    id: "Landscape",
  },
  {
    image:
      "https://instagram.fsaw1-14.fna.fbcdn.net/v/t51.82787-15/706064577_18322661788285466_6246227564417512248_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=109&_nc_map=urlgen_bucketless&ig_cache_key=MzkwNzA1MjQyMTI4Njk1Mzc3Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTE1Mi5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=qfdf4XVGaNoQ7kNvwFfRmns&_nc_oc=Ado6cv6uoTAUtal8lil48AuFwkSrWIQ6MohRVEjLfbuw0NAVpHxiz2DZOhR9FCk1xjw&_nc_zt=23&_nc_ht=instagram.fsaw1-14.fna&_nc_gid=egX7c0lU80kkXk5osj2CxQ&_nc_ss=7baaf&oh=00_AQPps2MgfL_0FT2sJyDmWGE1pid5JQVrMYygrG71BJ5d7g&oe=6AD0FA3A",
    title: "ÜNOG Münazara",
    id: "Urban",
  },
];

export function UpcomingEvents() {
  return (
    <div className="mb-10 w-full relative bg-background">
      <div className="pointer-events-none relative z-10 grid min-h-67 grid-cols-3 gap-3">
        <Image
          src="/assets/ufoggj-cropped.png"
          width={720}
          height={443}
          alt=""
          className="absolute top-4 left-4 h-auto w-40 -rotate-12 sm:top-8 sm:left-8 sm:w-60 lg:top-16 lg:left-12 lg:w-80 xl:w-88"
        />
        <div className="col-start-2 flex items-center justify-center">
          <h2 className="font-bold text-5xl">Yakındaki etkinliklerimiz</h2>
        </div>
      </div>
      <div className="relative h-180">
        <CoverFlow
          items={Images}
          itemWidth={432}
          itemHeight={558}
          initialIndex={2}
          enableScroll={true}
          scrollThreshold={60}
          centerGap={180}
          stackSpacing={250}
          rotation={50}
          enableClickToSnap={true}
          enableAudio={false}
        />
      </div>
    </div>
  );
}
