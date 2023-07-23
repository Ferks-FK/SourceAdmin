import { useEffect } from 'react';
import { useDeviceStore } from '@/stores/theme/device';
import { useSidebarStore } from '@/stores/components/sidebar';

export enum DeviceSize {
    'SM' = 'sm',
    'MD' = 'md',
    'LG' = 'lg',
    'XL' = 'xl',
    '2XL' = '2xl'
}

function getDeviceType() {
    const widthSize: number = window.innerWidth;
    let deviceSize: string = '';

    // mobile between 280px at 639px OR between 640px at 767px.
    if ((widthSize >= 280 && widthSize < 640) || (widthSize >= 640 && widthSize < 768)) {
        deviceSize = DeviceSize.SM
    }

    // tablet between 768px at 1023px.
    if (widthSize >= 768 && widthSize < 1024) {
        deviceSize = DeviceSize.MD
    }

    // desktop between 1024px at 1279px.
    if (widthSize >= 1024 && widthSize < 1280) {
        deviceSize = DeviceSize.LG
    }

    // desktop between 1280px at 1535px.
    if (widthSize >= 1280 && widthSize < 1536) {
        deviceSize = DeviceSize.XL
    }

    // desktop 1536px or higher.
    if (widthSize >= 1536) {
        deviceSize = DeviceSize['2XL']
    }

    return { deviceSize, widthSize };
}

function useDeviceType() {
    const [ sidebarIsVisible, setSidebarIsVisible ] = useSidebarStore((state) => [state.isVisible, state.setIsVisible])
    const [ setDeviceType ] = useDeviceStore((state) => [state.setDevice]);
    const { deviceSize, widthSize } = getDeviceType()

    useEffect(() => {
        const handleResize = () => {
            setDeviceType(deviceSize)
        }

        handleResize()
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    // This is only for manual screen size adjustment.
    useEffect(() => {
        if ((widthSize >= 768) && sidebarIsVisible == false) {
            setSidebarIsVisible()
        }

        if ((widthSize < 768) && sidebarIsVisible == true) {
            setSidebarIsVisible()
        }
    }, [deviceSize])
}

export { useDeviceType }
