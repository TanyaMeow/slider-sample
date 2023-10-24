import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;
const Slide = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NavigationStyle = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 800px;
`;
const PaginationStyle = styled.div`
  display: flex;

  & div {
    margin-left: 10px;
  }
`;
const CurrentSlide = styled.p`
  position: absolute;
  top: 10px;
  left: 600px;
  color: black;
`;

export interface SlidesInterface {
    img: string,
    text: string
}
type SliderProps = {
    slides: SlidesInterface[],
    auto: boolean,
    navs: boolean,
    delay: number,
    loop: boolean,
    pags: boolean,
    stopMouseHover: boolean
}
type NavigationProps = {
    onPrevSlide(): any,
    onNextSlide(): any
}

function Navigation(props: NavigationProps) {
    return (
        <>
            <img className='prev' src='/icon/prev.svg' onClick={props.onPrevSlide()} alt=''/>
            <img className='next' src='/icon/next.svg' onClick={props.onNextSlide()} alt=''/>
        </>
    )
}

type PaginationProps = {
    slides: SlidesInterface[],
    currentIndex: number,
    onPagination(current: number): void
}

function Pagination(props: PaginationProps) {
    return (
        <>
            {props.slides.map((_: any, index: number) => (
                <div key={index} onClick={() => props.onPagination(index)}
                     className={index === props.currentIndex ? 'active' : 'no-active'}>
                </div>
            ))}
        </>
    )
}

export function Slider({slides, loop, navs, pags, auto, delay, stopMouseHover}: SliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        let interval: any;

        if (auto) {
            interval = setInterval(() => {
                if (!stopMouseHover || !document.querySelector(':hover')?.contains(sliderRef.current)) {
                    nextSlide();
                }
            }, delay * 1000);
        }

        return () => {
            if (auto) {
                clearInterval(interval);
            }
        };
    }, [currentIndex, auto, delay, stopMouseHover]);

    function nextSlide() {
        setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? (loop ? 0 : prevIndex) : prevIndex + 1));
    }

    function prevSlide() {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? (loop ? slides.length - 1 : prevIndex) : prevIndex - 1));
    }

    function pagination(current: number) {
        setCurrentIndex(current);
    }

    return (
        <Container>
            <CurrentSlide><>{currentIndex + 1}/{slides.length}</></CurrentSlide>

            {navs && (
                <NavigationStyle>
                    <Navigation onNextSlide={() => nextSlide}
                                onPrevSlide={() => prevSlide}/>
                </NavigationStyle>
            )}

            <Slide ref={sliderRef}>
                <div className='slide'>
                    <img className='slide_image' src={slides[currentIndex].img} alt=""/>
                    <p>{slides[currentIndex].text}</p>
                </div>
            </Slide>

            {pags && (
                <PaginationStyle>
                    <Pagination slides={slides}
                                currentIndex={currentIndex}
                                onPagination={(current: number) => pagination(current)}/>
                </PaginationStyle>
            )}
        </Container>
    );
}