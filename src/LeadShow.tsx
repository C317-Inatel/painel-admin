import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  useRecordContext,
  useNotify,
  useRedirect,
  useDelete,
} from 'react-admin';
import { Button, Stack } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


const DownloadPdfButton = () => {
  const record = useRecordContext();
  const pdfUrl = record?.pdf?.file_url;

  if (!pdfUrl) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(pdfUrl);

      if (!response.ok) {
        throw new Error('Erro ao baixar PDF');
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `lead-${record.id}.pdf`; 
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      alert('Erro ao baixar PDF');
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<PictureAsPdfIcon />}
      onClick={handleDownload}
    >
      Baixar PDF
    </Button>
  );
};

const WhatsAppButton = () => {
  const record = useRecordContext();
  if (!record?.phone) return null;

  const phone = record.phone.replace(/\D/g, '');
  const link = `https://wa.me/${phone}`;

  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<WhatsAppIcon />}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      WhatsApp
    </Button>
  );
};

const DeleteButton = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const [deleteOne, { isLoading }] = useDelete();

  if (!record) return null;

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este lead?')) {
      deleteOne(
        'leads',
        { id: record.id },
        {
          onSuccess: () => {
            notify('Lead excluído com sucesso', { type: 'success' });
            redirect('list', 'leads');
          },
          onError: () => {
            notify('Erro ao excluir lead', { type: 'error' });
          },
        }
      );
    }
  };

  return (
    <Button
      variant="outlined"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={handleDelete}
      disabled={isLoading}
    >
      Excluir
    </Button>
  );
};

export const LeadShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="phone" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <WhatsAppButton />
        <DownloadPdfButton />
        <DeleteButton />
      </Stack>
    </SimpleShowLayout>
  </Show>
);
