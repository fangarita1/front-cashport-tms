/* eslint-disable no-unused-vars */
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import styles from "./details.module.scss";
import Header from "@/components/organisms/header";
import { CaretDoubleRight, CaretLeft, DotsThree } from "phosphor-react";
import { Button, Drawer, message, Modal, Typography } from "antd";
import { MainDescription } from "./main-description/MainDescription";
import { Step } from "./step/Step";
import { useEffect, useState } from "react";
import { Novelty } from "./novelty/Novelty";
import { getTransferRequestDetail } from "@/services/logistics/transfer-request";
import { useParams } from "next/navigation";
import { ITransferRequestDetail } from "@/types/transferRequest/ITransferRequest";
import { useRouter } from "next/navigation";
import { DrawerBody } from "./drawer-body/DrawerBody";
import { INovelty } from "@/types/novelty/INovelty";
import {
  aprobeOrRejectDetail,
  createNovelty,
  getNoveltyDetail
} from "@/services/logistics/novelty";
import { getTransferJourney } from "@/services/logistics/transfer-journey";
import { ITransferJourney } from "@/types/transferJourney/ITransferJourney";
import { DrawerCreateBody } from "./drawer-create-body/DrawerCreateBody";
import ModalGenerateActionTO from "@/components/molecules/modals/ModalGenerateActionTO/ModalGenerateActionTO";
import { BillingTable } from "./billing-table/BillingTable";
import { getBillingByTransferRequest } from "@/services/logistics/billing_list";
import { BillingByCarrier } from "@/types/logistics/billing/billing";
import ModalBillingMT from "@/components/molecules/modals/ModalBillingMT/ModalBillingMT";
const mockData = [
  {
    name: "Coltanques",
    id: 1,
    totalValue: 20000
  },
  {
    name: "Cocoras",
    id: 2,
    totalValue: 10000
  },
  {
    name: "RH",
    id: 3,
    totalValue: 13000
  }
];
const Text = Typography;

export enum NavEnum {
  NOVELTY = "NOVELTY",
  VEHICLES = "VEHICLES",
  MATERIALS = "MATERIALS",
  DOCUMENTS = "DOCUMENTS",
  PSL = "PSL",
  BILLING = "BILLING"
}

export const TransferOrderDetails = () => {
  const [nav, setNav] = useState<NavEnum>(NavEnum.NOVELTY);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalMTVisible, setIsModalMTVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isCreateNovelty, setIsCreateNovelty] = useState<boolean>(false);
  const [transferRequest, setTransferRequest] = useState<ITransferRequestDetail | null>(null);
  const [transferJournies, setTransferJournies] = useState<ITransferJourney[]>();
  const [novelty, setNovelty] = useState<INovelty | null>(null);
  const [billingList, setBillingList] = useState<BillingByCarrier[]>([]);

  const [tripId, setTripId] = useState<number | null>(null);
  const [form, setForm] = useState({
    noeltyTypeId: null,
    quantity: 0,
    observation: "",
    value: 0
  });

  const { id } = useParams();
  const router = useRouter();

  const findNoveltyDetail = async (id: number) => {
    setIsCreateNovelty(false);
    const data = await getNoveltyDetail(id);
    if (Object.keys(data).length) {
      setNovelty(data as INovelty);
    }
  };

  const renderView = () => {
    switch (nav) {
      case NavEnum.NOVELTY:
        return (
          <Novelty
            transferRequestId={transferRequest?.id || null}
            openDrawer={() => setOpenDrawer(true)}
            handleOpenCreateDrawer={handleOpenCreateDrawer}
            handleShowDetails={findNoveltyDetail}
            transferJournies={transferJournies || []}
            setTripId={(id: number) => setTripId(id)}
            handleOpenMTModal={handleOpenMTModal}
          />
        );
      case NavEnum.VEHICLES:
        return <div>Vehicles view</div>;
      case NavEnum.MATERIALS:
        return <div>Materials view</div>;
      case NavEnum.DOCUMENTS:
        return <div>Documents view</div>;
      case NavEnum.PSL:
        return <div>Psl view</div>;
      case NavEnum.BILLING:
        return <BillingTable supplierBillings={billingList} handleShowDetails={() => {}} />;
      default:
        return <div />;
    }
  };

  const findDetails = async () => {
    const data = await getTransferRequestDetail(Number(id));
    if (Object.keys(data).length) {
      setTransferRequest(data as ITransferRequestDetail);
    }
  };

  const findNovelties = async () => {
    const data = await getTransferJourney(Number(transferRequest?.id || id));
    if (Object.keys(data).length) {
      setTransferJournies(data as ITransferJourney[]);
    }
  };

  const findBilling = async () => {
    const data = await getBillingByTransferRequest(Number(transferRequest?.id || id));
    if (Object.keys(data).length) {
      setBillingList(data as BillingByCarrier[]);
    }
  };

  const approbeOrReject = async (id: number, isApprobe: boolean) => {
    const data = await aprobeOrRejectDetail(id, isApprobe);
    if (data) {
      findNovelties();
      findDetails();
      setOpenDrawer(false);
    }
  };

  const handleCreateNovelty = async () => {
    const body = {
      observation: form.observation,
      novelty_type_id: form.noeltyTypeId!,
      trip_id: tripId!,
      quantity: form.quantity,
      value: form.value,
      created_by: "Oscar Rincon",
      evidences: []
    };
    try {
      const create = await createNovelty(body);
      if (create) {
        setOpenDrawer(false);
        setForm({
          noeltyTypeId: null,
          quantity: 0,
          observation: "",
          value: 0
        });
        findNovelties();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setNovelty(null);
    setForm({
      noeltyTypeId: null,
      quantity: 0,
      observation: "",
      value: 0
    });
  };

  const handleOpenCreateDrawer = () => {
    setIsCreateNovelty(true);
    setOpenDrawer(true);
  };
  const handleOpenMTModal = () => {
    setIsModalMTVisible(true);
  };
  useEffect(() => {
    findDetails();
    findBilling();
  }, []);

  useEffect(() => {
    findNovelties();
  }, [transferRequest]);

  return (
    <div className={styles.mainTransferOrdersDetails}>
      <SideBar />
      <div className={styles.content}>
        {contextHolder}
        <Header title="Resumen del viaje" />
        <div className={styles.card}>
          <div className={styles.titleContainer}>
            <div onClick={() => router.back()} className={styles.backContainer}>
              <CaretLeft size={24} />
              <Text className={styles.title}>Datos del viaje</Text>
            </div>
            <div className={styles.btnContainer}>
              <Button
                className={styles.actionBtn}
                type="text"
                size="large"
                onClick={() => setIsModalVisible(true)}
              >
                <DotsThree size={24} />
                <Text className={styles.text}>Generar acción</Text>
              </Button>
              <Button className={styles.tranckingBtn} type="text" size="large">
                <Text className={styles.text}>Tracking</Text>
                <CaretDoubleRight size={24} />
              </Button>
            </div>
          </div>
          <MainDescription transferRequest={transferRequest} />
          <Step step={transferRequest?.step || 1} />
        </div>
        <div className={styles.card}>
          <div className={styles.navContainer}>
            <Text
              onClick={() => setNav(NavEnum.NOVELTY)}
              className={`${styles.nav} ${nav === NavEnum.NOVELTY && styles.active}`}
            >
              Novedades
            </Text>
            {/* <Text onClick={() => setNav(NavEnum.VEHICLES)} className={`${styles.nav} ${nav === NavEnum.VEHICLES && styles.active}`}>Vehículos</Text>
            <Text onClick={() => setNav(NavEnum.MATERIALS)} className={`${styles.nav} ${nav === NavEnum.MATERIALS && styles.active}`}>Materiales</Text>
            <Text onClick={() => setNav(NavEnum.DOCUMENTS)} className={`${styles.nav} ${nav === NavEnum.DOCUMENTS && styles.active}`}>Documentos</Text>
            <Text onClick={() => setNav(NavEnum.PSL)} className={`${styles.nav} ${nav === NavEnum.PSL && styles.active}`}>PSL</Text> */}
            <Text
              onClick={() => setNav(NavEnum.BILLING)}
              className={`${styles.nav} ${nav === NavEnum.BILLING && styles.active}`}
            >
              Facturación
            </Text>
          </div>
          <div>{renderView()}</div>
        </div>
      </div>
      <Drawer
        placement="right"
        open={openDrawer}
        onClose={handleCloseDrawer}
        closable={false}
        key="right"
        width={592}
        styles={{
          body: {
            backgroundColor: "#FFFFFF"
          }
        }}
      >
        {!isCreateNovelty ? (
          <DrawerBody
            onClose={handleCloseDrawer}
            novelty={novelty}
            approbeOrReject={approbeOrReject}
          />
        ) : (
          <DrawerCreateBody
            onClose={handleCloseDrawer}
            handleCreateNovelty={handleCreateNovelty}
            form={form}
            setForm={setForm}
          />
        )}
      </Drawer>
      <ModalGenerateActionTO
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        idTR={id as string}
        carriersData={billingList}
        messageApi={messageApi}
      />
      <ModalBillingMT
        isOpen={isModalMTVisible}
        onClose={() => setIsModalMTVisible(false)}
        idTR={id as string}
        idCarrier={0}
        idVehicle={0}
        messageApi={messageApi}
      />
    </div>
  );
};
