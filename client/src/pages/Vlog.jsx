import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

export default function Vlog() {
    SwiperCore.use([Navigation]);

    const [vlog, setVlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const params = useParams();

    useEffect(() => {
        const fetchVlog = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/vlog/get/${params.vlogId}`);
                const data = await res.json();

                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                setVlog(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                console.error("Error fetching vlog:", error);
                setError(true);
                setLoading(false);
            }
        };

        fetchVlog();
    }, [params.vlogId]);

    return (
        <main>
            {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
            {error && <p className="text-center my-7 text-2xl text-red-600">Something went wrong</p>}

            {vlog && !loading && !error && (
                <>
                    <Swiper navigation className="my-5">
                        {vlog.imageURL.map((url) => (
                            <SwiperSlide key={url}>
                                <div
                                    className="h-[500px] bg-center bg-cover"
                                    style={{ backgroundImage: `url(${url})` }}
                                ></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            )}
        </main>
    );
}
