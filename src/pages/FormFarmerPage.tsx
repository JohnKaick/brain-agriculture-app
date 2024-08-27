import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Message, Grid, Label } from 'semantic-ui-react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Farmer } from '../contexts/FarmersContext';
import { brazilStates } from '../utils/states';
import MaskedInput from 'react-text-mask'
import { maskCpfCnpj } from '../utils/mask-cpf-cnpj';

interface FormFarmerProps {
    isOpen: boolean;
    onClose: () => void;
    farmer: Farmer | Record<string, any>;
    fetchFarmers: () => void;
}

const FormFarmerPage: React.FC<FormFarmerProps> = ({ isOpen, onClose, farmer, fetchFarmers }) => {
  const { control, handleSubmit, setValue, formState: { errors, isValid }, watch } = useForm<Farmer>({
    defaultValues: {
      name: '',
      document: '',
      documentType: '',
      farmName: '',
      city: '',
      state: '',
      totalArea: '',
      arableArea: '',
      vegetationArea: '',
      crops: [],
    },
    mode: 'onChange',
  });
  const [crops, setCrops] = useState<string[]>(watch("crops") || []);
  const [msgErrorApi, setMsgErrorApi] = useState<string | null>(null);
  
  const documentType = watch("documentType");
  const totalArea = watch("totalArea");
  const arableArea = watch("arableArea");
  const vegetationArea = watch("vegetationArea");

  useEffect(() => {
    if (farmer) {
      setValue('name', farmer.name);
      setValue('document', farmer.document);
      setValue('documentType', farmer.documentType);
      setValue('farmName', farmer.farmName);
      setValue('city', farmer.city);
      setValue('state', farmer.state);
      setValue('totalArea', farmer.totalArea);
      setValue('arableArea', farmer.arableArea);
      setValue('vegetationArea', farmer.vegetationArea);
      setValue('crops', farmer.crops);
      setCrops(farmer.crops || []);
    }
  }, [farmer, setValue]);


  const handleAddCrop = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (value && !crops.includes(value)) {
        setCrops(prev => [...prev, value]);
        setValue('crops', [...crops, value]);
        (e.target as HTMLInputElement).value = '';
      }
    }
  };

  const handleRemoveCrop = (crop: string) => {
    const updatedCrops = crops.filter(c => c !== crop);
    setCrops(updatedCrops);
    setValue('crops', updatedCrops);
  };

  const onSubmit = async (data: Farmer) => {
    setMsgErrorApi(null);
    try {
        if (farmer?.id) {
            await axios.patch(`http://localhost:3000/farmers/${farmer.id}`, {
              ...data,
              totalArea: Number(totalArea),
              arableArea: Number(arableArea),
              vegetationArea: Number(vegetationArea),
            });
          } else {
            await axios.post('http://localhost:3000/farmers', {
              ...data,
              totalArea: Number(totalArea),
              arableArea: Number(arableArea),
              vegetationArea: Number(vegetationArea),
            });
          }
      fetchFarmers();
      onClose();
    } catch (error: any) {
      if (error?.status === 400) {
        const { message } = error?.response?.data;
        setMsgErrorApi(message);
      } else {
        setMsgErrorApi('Erro interno na API');
      }
    }
  };

  const isButtonEnabled = isValid && crops.length > 0;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>{farmer.id ? 'Editar Agricultor' : 'Cadastrar Agricultor'}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid columns={3} stackable>
            <Grid.Row>
              <Grid.Column>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Nome é obrigatório' }}
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      label="Nome"
                      error={errors.name ? { content: errors.name.message } : null}
                    />
                  )}
                />
              </Grid.Column>
              <Grid.Column>
                <Controller
                  name="documentType"
                  control={control}
                  rules={{ required: 'Tipo de Documento é obrigatório' }}
                  render={({ field }) => (
                    <Form.Select
                      {...field}
                      label="Tipo de Documento"
                      options={[
                        { key: 'cpf', text: 'CPF', value: 'CPF' },
                        { key: 'cnpj', text: 'CNPJ', value: 'CNPJ' },
                      ]}
                      error={errors.documentType ? { content: errors.documentType.message } : null}
                      onChange={(_e, { value }) => field.onChange(value)}
                    />
                  )}
                />
              </Grid.Column>
              <Grid.Column>
                <Controller
                  name="document"
                  control={control}
                  rules={{ required: 'Documento é obrigatório' }}
                  render={({ field }) => (
                    <Form.Input
                        {...field}
                        label="Documento (Digite apenas os números)"
                        error={errors.document ? { content: errors.document.message } : null}
                        children={
                        <MaskedInput
                            mask={maskCpfCnpj(documentType)}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                        />
                        }
                    />
                  )}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Controller
                  name="farmName"
                  control={control}
                  rules={{ required: 'Nome da Fazenda é obrigatório' }}
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      label="Nome da Fazenda"
                      error={errors.farmName ? { content: errors.farmName.message } : null}
                    />
                  )}
                />
              </Grid.Column>
              <Grid.Column>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: 'Cidade é obrigatória' }}
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      label="Cidade"
                      error={errors.city ? { content: errors.city.message } : null}
                    />
                  )}
                />
              </Grid.Column>
              <Grid.Column>
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: 'Estado é obrigatório' }}
                  render={({ field }) => (
                    <Form.Select
                      {...field}
                      label="Estado"
                      options={brazilStates}
                      error={errors.state ? { content: errors.state.message } : null}
                      onChange={(_e, { value }) => field.onChange(value)}
                    />
                  )}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Controller
                  name="totalArea"
                  control={control}
                  rules={{ 
                    required: 'Área Total é obrigatória',
                    validate: (value) => !isNaN(Number(value)) || 'Área Total deve ser um número válido',
                  }}
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      type="number"
                      step="0.01"
                      label="Área Total"
                      error={errors.totalArea ? { content: errors.totalArea.message } : null}
                    />
                  )}
                />
              </Grid.Column>
              <Grid.Column>
                <Controller
                  name="arableArea"
                  control={control}
                  rules={{ 
                    required: 'Área Cultivável é obrigatória',
                    validate: (value) => {
                        const arableValue = parseFloat(value);
                        const vegetationValue = parseFloat(vegetationArea || "0");
                        if (isNaN(arableValue)) {
                          return 'Área Cultivável deve ser um número válido';
                        }
                        if (arableValue + vegetationValue > parseFloat(totalArea || "0")) {
                          return 'Soma das áreas (Cultivável e Vegetação) não pode exceder a Área Total';
                        }
                        return true;
                      },
                  }}
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      type="number"
                      step="0.01"
                      label="Área Cultivável"
                      error={errors.arableArea ? { content: errors.arableArea.message } : null}
                    />
                  )}
                />
              </Grid.Column>
              <Grid.Column>
                <Controller
                  name="vegetationArea"
                  control={control}
                  rules={{ 
                    required: 'Área de Vegetação é obrigatória',
                    validate: (value) => {
                        const vegetationValue = parseFloat(value);
                        const arableValue = parseFloat(arableArea || "0");
                        if (isNaN(vegetationValue)) {
                          return 'Área de Vegetação deve ser um número válido';
                        }
                        if (vegetationValue + arableValue > parseFloat(totalArea || "0")) {
                          return 'Soma das áreas (Cultivável e Vegetação) não pode exceder a Área Total';
                        }
                        return true;
                      },
                  }}
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      type="number"
                      step="0.01"
                      label="Área de Vegetação"
                      error={errors.vegetationArea ? { content: errors.vegetationArea.message } : null}
                    />
                  )}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid>
            <Grid.Row>
            <Grid.Column>
                <Controller
                  name="crops"
                  control={control}
                  render={() => (
                    <Form.Field>
                      <label>Culturas</label>
                      <Form.Input
                        placeholder="Digite uma cultura e pressione Enter"
                        onKeyDown={handleAddCrop}
                      />
                      <div style={{ marginTop: '10px' }}>
                        {crops.map((crop, index) => (
                          <Label
                            key={index}
                            as="a"
                            color="teal"
                            style={{ margin: '5px' }}
                            onClick={() => handleRemoveCrop(crop)}
                          >
                            {crop} <Label.Detail>X</Label.Detail>
                          </Label>
                        ))}
                      </div>
                      {errors.crops && <Message error content={errors.crops.message} />}
                    </Form.Field>
                  )}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
        {msgErrorApi && (
            <Message error content={msgErrorApi} />
        )}
      </Modal.Content>
      <Modal.Actions>
        {!isButtonEnabled && (
          <Message
            warning
            compact
            content="Preencha todos os campos do formulário"
          />
        )}
        <Button secondary onClick={onClose}>Cancelar</Button>
        <Button type="submit" primary disabled={!isButtonEnabled} onClick={handleSubmit(onSubmit)}>
          Salvar
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FormFarmerPage;
