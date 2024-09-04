import { Button, Input, Select, Typography, Upload } from 'antd';
import styles from './drawerCreateBody.module.scss';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { CaretDoubleRight, ChartBar, ChartLineUp, Check, FileArrowDown, Files, Money, PlusCircle, User } from 'phosphor-react';
import { getNoveltyTypes } from '@/services/logistics/novelty';
import { INovelty, INoveltyType } from '@/types/novelty/INovelty';
import { noveltyQuantity } from '@/utils/constants/novelties';
import { IForm } from '../Details';
import { UploadFile } from 'antd/lib';
import { UploadChangeParam } from 'antd/es/upload';
import { FileDownloadModal } from '@/components/molecules/modals/FileDownloadModal/FileDownloadModal';

const Text = Typography;

interface IDrawerBodyProps {
  onClose: () => void;
  handleCreateNovelty: () => void;
  novelty: INovelty | null;
  form: IForm;
  setForm: Dispatch<SetStateAction<IForm>>;
  formEvidences: File[];
  setFormEvidences: Dispatch<SetStateAction<File[]>>
}

export const DrawerCreateBody: FC<IDrawerBodyProps> = ({
  onClose,
  handleCreateNovelty,
  form,
  setForm,
  novelty,
  formEvidences,
  setFormEvidences
}) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [novelties, setNovelties] = useState<INoveltyType[]>([]);

  const findNoveltyTypes = async () => {
    const data = await getNoveltyTypes();
    if (data.length > 0) {
      setNovelties(data);
    }
  }

  useEffect(() => {
    findNoveltyTypes();
  }, [])

  useEffect(() => {
    if (novelty && novelty.id) {
      const getNovelty = novelties.find((f) => f.name === novelty.novelty_type);
      setForm({
        noeltyTypeId: getNovelty?.id || null,
        quantity: novelty.quantity,
        observation: novelty.observation,
        value: novelty.value,
      });
    }
  }, [novelties])

  useEffect(() => {
    if (form.noeltyTypeId && form.observation && form.value) {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
  }, [form])

  const updateFiles = (newFile: File) => {
    setFormEvidences((prevState: File[]) => {
      const existingFileIndex = prevState.findIndex(
        (file) => file.name === newFile.name
      );

      if (existingFileIndex !== -1) {
        const updatedFiles = [...prevState];
        updatedFiles[existingFileIndex] = newFile;
        return updatedFiles;
      } else {
        return [...prevState, newFile];
      }
    });
  };

  const handleUploadFile = (info: UploadChangeParam<UploadFile<File>>) => {
    const { file: rawFile } = info;
    if (rawFile) {
      const fileSizeInMB = rawFile.size && rawFile.size / (1024 * 1024);

      if (fileSizeInMB && fileSizeInMB > 30) {
        alert("El archivo es demasiado grande. Por favor, sube un archivo de menos de 30 MB.");
        return;
      }

      if (rawFile.originFileObj) {
        updateFiles(rawFile.originFileObj);
      } else {
        console.warn("El archivo no contiene un File válido:", rawFile);
      }
    }
  }

  return (
    <div className={styles.mainDrawerBody}>
      <div onClick={onClose} className={styles.closeContainer}>
        <CaretDoubleRight size={20} />
      </div>
      <div className={styles.titleSection}>
        <div className={styles.titleContainer}>
          <Text className={styles.title}>Novedad</Text>
        </div>
        <div className={styles.btnContainer}>
          <Button
            onClick={handleCreateNovelty}
            type='text'
            className={`${styles.approbeBtn} ${isDisabled && styles.disabled}`}
            disabled={isDisabled}
          >
            <Check color='#141414' size={12} />
            <Text className={styles.approbeLabel}>{novelty && novelty.id ? 'Actualizar novedad' : 'Crear novedad'}</Text>
          </Button>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.formContainer}>
        <div className={styles.leftSection}>
          <div>
            <div className={styles.formTitleContainer}>
              <ChartBar color='#666666' size={20} />
              <Text className={styles.formTitle}>Tipo de novedad</Text>
            </div>
            <Select
              className={styles.select}
              value={form.noeltyTypeId}
              onChange={(val) => setForm({ ...form, noeltyTypeId: val })}
              placeholder='Seleccionar origen o destino'
              options={novelties.map((novelty) => ({ id: novelty.id, value: novelty.id, label: novelty.name }))}
            />
          </div>

        </div>
        <div className={styles.rightSection}>
          <div>
            <div className={styles.formTitleContainer}>
              <ChartLineUp color='#666666' size={20} />
              <Text className={styles.formTitle}>Cantidad</Text>
            </div>
            <Select
              className={styles.select}
              value={form.quantity}
              onChange={(val) => setForm({ ...form, quantity: val })}
              placeholder='Escribe la cantidad'
              options={noveltyQuantity}
            />
          </div>
          <div>
            <div className={styles.formTitleContainer}>
              <Money color='#666666' size={20} />
              <Text className={styles.formTitle}>Sobrecosto</Text>
            </div>
            <Input
              value={form.value}
              onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
              className={`${styles.input} ${styles.background}`}
              placeholder='$0'
            />
          </div>
        </div>
      </div>
      <div>
        <div className={styles.formTitleContainer}>
          <User color='#666666' size={20} />
          <Text className={styles.formTitle}>Observaciones</Text>
        </div>
        <Input
          value={form.observation}
          className={styles.input}
          onChange={(e) => setForm({ ...form, observation: e.target.value })}
          placeholder='Escribir nombre'
        />
      </div>
      <div className={styles.divider} />
      <div className={styles.evidenceContainer}>
        <div className={styles.evidenceTitleContainer}>
          <Files size={20} color='#666666' />
          <Text className={styles.evidenceTitle}>Evidencia</Text>
        </div>
        <div className={styles.evidences}>
          {formEvidences.map((file, index) => (
            <div key={`evidence-${index}`} className={styles.evidence}>
              <Text className={styles.evidenceTitle}>{file.name}</Text>
              <FileArrowDown color='#141414' size={20} />
            </div>
          ))}
          <Upload
            accept='.pdf, .png, .doc, .docx'
            showUploadList={false}
            onChange={handleUploadFile}
          >
            <div className={styles.createEvidenceContainer}>
              <PlusCircle size={24} color='#141414' />
              <Text className={styles.createEvidence}>Agregar documento</Text>
            </div>
          </Upload>
        </div>
      </div>
    </div>
  )
}