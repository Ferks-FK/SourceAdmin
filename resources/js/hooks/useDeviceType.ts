import { useEffect } from 'react';
import { useDeviceStore } from '@/stores/theme/device';

export enum DeviceSize {
    'SM' = 'sm',
    'MD' = 'md',
    'LG' = 'lg',
    'XL' = 'xl',
    '2XL' = '2xl'
}

function getDeviceType() {
    const width: number = window.innerWidth;

    let device: string = '';

    // mobile between 280px at 639px OR between 640px at 767px.
    if ((width >= 280 && width < 640) || (width >= 640 && width < 768)) {
        device = DeviceSize.SM
    }

    // tablet between 768px at 1023px.
    if (width >= 768 && width < 1024) {
        device = DeviceSize.MD
    }

    // desktop between 1024px at 1279px.
    if (width >= 1024 && width < 1280) {
        device = DeviceSize.LG
    }

    // desktop between 1280px at 1535px.
    if (width >= 1280 && width < 1536) {
        device = DeviceSize.XL
    }

    // desktop 1536px or higher.
    if (width >= 1536) {
        device = DeviceSize['2XL']
    }

    return device;
}

function useDeviceType() {
    const [ setDeviceType ] = useDeviceStore((state) => [state.setDevice]);

    useEffect(() => {
        const handleResize = () => {
            setDeviceType(getDeviceType())
        }

        handleResize()
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
}

export { useDeviceType }
