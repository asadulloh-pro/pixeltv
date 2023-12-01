import { useCallback, useEffect, useState } from 'react';
import { ITickets } from '@/types';
import Table from '@/components/table';
import moment from 'moment';
export const tarifs = {
  'Bolalar Maydonchasi Yarim Soat': 30,
  'Bolalar Maydonchasi Bir Soat': 60,
};

const sorting = (data: ITickets[]) => {
  let arra = [...data];
  arra.sort((a, b) => {
    const dateA = new Date(
      moment(a?.doc_date).add(tarifs[a.service_name], 'minutes').format()
    );
    const dateB = new Date(
      moment(b?.doc_date).add(tarifs[b.service_name], 'minutes').format()
    );

    return dateA.getTime() - dateB.getTime();
  });
  arra = arra.filter((elem) => Object.keys(tarifs).includes(elem.service_name));
  return arra;
};

const videos = ['/00.mp4'];

export default function Home() {
  const [isList, setIslist] = useState(false);
  const [videoSrc, setVideoSrc] = useState('/00.mp4');
  const [data, setData] = useState<ReturnType<typeof sorting>>([]);
  let currentVideoIndex = 0;

  const showList = useCallback(() => {
    setIslist(true);
  }, []);

  const showVideo = useCallback(() => {
    setIslist(false);
  }, []);

  const switchContent = useCallback(() => {
    showList();
    setTimeout(() => {
      showVideo();
      switchVideo();
    }, 10000);
  }, []);

  function switchVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    setVideoSrc(videos[currentVideoIndex]);
    const videoPlayer = document.getElementById(
      'videoPlayer'
    ) as HTMLVideoElement;
    if (videoPlayer) {
      videoPlayer.load();
      videoPlayer.play();
    }
  }

  const getData = useCallback(async () => {
    const response = await fetch('/api/hello');
    const res = await response.json();
    const filter = sorting(res.result.data.docs);
    setData(filter);
  }, []);

  useEffect(() => {
    getData();
    const getter = setInterval(() => {
      getData();
    }, 60000);

    return () => {
      clearTimeout(getter);
    };
  }, []);
  return (
    <div className="min-h-[100dvh] max-h-[100dvh] flex flex-col gap-[1rem] pt-[1rem] main">
      {false ? (
        <video
          id="videoPlayer"
          width="640"
          height="360"
          controls
          autoPlay
          onEnded={() => {
            switchContent();
          }}
        >
          <source id="videoSource" src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <>
          <div className="flex items-center justify-center">
            <img src="/vite.svg" alt="logo" width="150px" />
          </div>
          <div className="grid gap-[0.75rem] mx-auto px-[1rem]">
            <Table data={data} />
          </div>
        </>
      )}
    </div>
  );
}
