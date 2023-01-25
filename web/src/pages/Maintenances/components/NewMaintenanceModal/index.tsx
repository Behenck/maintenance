import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { Button } from '../../../../components/Button'
import { ToastAxiosError } from '../../../../errors/ToastAxiosError'
import { api } from '../../../../lib/api'
import { Steps } from './Steps'
import { StepInfo } from './Steps/StepInfo'
import { StepMachine } from './Steps/StepMachine'
import { StepUser } from './Steps/StepUser'
import { useMutation } from 'react-query'
import { queryClient } from '../../../../services/queryClient'

const NewMaintenanceFormSchema = z.object({
  userName: z.string().min(3),
  departmentName: z.string().min(2),
  ip: z
    .string()
    .min(11, { message: 'Digite um ip correto' })
    .max(15, { message: 'Digite um ip correto' }),
  processor: z.string(),
  motherboard: z.string(),
  memory: z.string(),
  font: z.string(),
  storage: z.string(),
  system: z.string(),
  maintenanceDate: z.string(),
  description: z.string(),
})

type NewMaintenanceFormInputs = z.infer<typeof NewMaintenanceFormSchema>

interface NewMaintenanceModalProps {
  onOpenModal: () => void
}

export function NewMaintenanceModal({ onOpenModal }: NewMaintenanceModalProps) {
  const [positionStep, setPositionStep] = useState(1)
  const [enableButton, setEnableButton] = useState(false)

  function nextStep() {
    if (positionStep < 3) {
      setPositionStep((step) => step + 1)
    }
  }

  function returnStep() {
    if (positionStep > 1) {
      setPositionStep((step) => step - 1)
    }
  }

  function onEnableButton(enable: boolean) {
    setEnableButton(enable)
  }

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<NewMaintenanceFormInputs>({
    resolver: zodResolver(NewMaintenanceFormSchema),
    defaultValues: {
      maintenanceDate: new Date().toISOString().split('T')[0],
    },
  })

  useEffect(() => {
    errors.userName && setPositionStep(1)
    errors.departmentName && setPositionStep(1)
    if (errors.ip) {
      setPositionStep(2)
      toast.error(errors.ip.message ? errors.ip.message : '')
    }
  }, [errors])

  function resetAll() {
    reset()
    setPositionStep(1)
    onOpenModal()
  }

  const createMaintenance = useMutation(
    async (data: NewMaintenanceFormInputs) => {
      try {
        await api.post('/maintenances', {
          ...data,
        })

        toast.success('Manutenção criada com sucesso!')
        resetAll()
      } catch (error) {
        console.log(error)
        ToastAxiosError(error)
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('maintenances')
      },
    },
  )

  const handleCreateMaintenance: SubmitHandler<
    NewMaintenanceFormInputs
  > = async (values) => {
    await createMaintenance.mutateAsync(values)
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className="fixed w-screen h-screen inset-0 bg-overlay"
        onClick={resetAll}
      />

      <Dialog.Content className="flex flex-col bg-gray-100 min-w-[32rem] rounded px-10 py-12 fixed top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-between mb-5">
          <Dialog.Title className="font-bold text-gray-800 text-xl">
            Nova Manutenção
          </Dialog.Title>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <X
                size={22}
                onClick={() => {
                  resetAll()
                }}
              />
            </button>
          </Dialog.Close>
        </div>

        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleCreateMaintenance)}
        >
          <Steps
            names={['Usuário', 'Máquina', 'Informações']}
            stepPosition={positionStep}
          />

          {positionStep === 1 && (
            <StepUser
              register={register}
              onEnableButton={onEnableButton}
              getValues={getValues}
              errors={errors}
            />
          )}
          {positionStep === 2 && (
            <StepMachine
              errors={errors}
              setValue={setValue}
              register={register}
            />
          )}
          {positionStep === 3 && <StepInfo register={register} />}

          <div className="w-full flex justify-between">
            {positionStep === 1 ? (
              <span></span>
            ) : (
              <Button
                type="button"
                onClick={returnStep}
                className="bg-gray-300 hover:bg-gray-350"
              >
                <span className="text-black">Voltar</span>
              </Button>
            )}

            {positionStep < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-blue-300 hover:bg-blue-400"
                isDisabled={!enableButton}
              >
                Próximo
              </Button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-2 px-3 rounded font-semibold text-gray-100 text-xs transition-colors focus:ring-2 ring-white flex gap-2 items-center justify-center bg-blue-300 hover:bg-blue-400"
              >
                Salvar
              </button>
            )}
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
