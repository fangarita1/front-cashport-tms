import { SideBar } from '@/components/molecules/SideBar/SideBar'
import styles from './transferOrders.module.scss'
import UiSearchInput from '@/components/ui/search-input/search-input'
import { FilterProjects } from '@/components/atoms/Filters/FilterProjects/FilterProjects'
import { useState } from 'react'
import { Request } from './request/Request'
import { InProcess } from './in-process/InProcess'
import { Completed } from './completed/completed'
import { Typography } from 'antd'
import Header from '../../header'

const { Text } = Typography;

enum TabEnum {
  'REQUESTS' = 'REQUESTS',
  'IN_PROCESS' = 'IN_PROCESS',
  'COMPLETED' = 'COMPLETED'
}

export const TransferOrders = () => {
  const [search, setSearch] = useState<string>("");
  const [selectFilters, setSelectFilters] = useState({
    country: [] as string[],
    currency: [] as string[]
  });
  const [tab, setTab] = useState<TabEnum>(TabEnum.IN_PROCESS);

  const renderView = () => {
    switch (tab) {
      case TabEnum.REQUESTS:
        return <Request search={search} />
      case TabEnum.IN_PROCESS:
        return <InProcess search={search} />
      case TabEnum.COMPLETED:
        return <Completed search={search} />
      default:
        return <Request search={search} />
    }
  }

  return (
    <div className={styles.mainTransferOrders}>
      <SideBar />
      <div className={styles.content}>
        <Header title="Ordenes de transferencia" />
        <div className={styles.card}>
          <div className={styles.filterContainer}>
            <UiSearchInput
              className="search"
              placeholder="Buscar"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <FilterProjects setSelecetedProjects={setSelectFilters} />
          </div>
          <div className={styles.tabContainer}>
            <Text onClick={() => setTab(TabEnum.REQUESTS)} className={`${styles.tab} ${tab === TabEnum.REQUESTS && styles.active}`}>Solicitudes</Text>
            <Text onClick={() => setTab(TabEnum.IN_PROCESS)} className={`${styles.tab} ${tab === TabEnum.IN_PROCESS && styles.active}`}>En curso</Text>
            <Text onClick={() => setTab(TabEnum.COMPLETED)} className={`${styles.tab} ${tab === TabEnum.COMPLETED && styles.active}`}>finalizados</Text>
          </div>
          <div>
            {renderView()}
          </div>
        </div>
      </div>
    </div>
  )
}