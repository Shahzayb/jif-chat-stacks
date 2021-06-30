import React from 'react';
import Layout from 'components/shared/Layout';
import GifRecorder from 'components/Post/GifRecorder';
import TextField from 'components/Post/TextField';
import {RiSendPlane2Fill} from 'react-icons/ri';
import {v4 as uuidv4} from 'uuid';
import {blobToBase64String} from 'blob-util';
import {Container, makeStyles, Paper, Button, CircularProgress} from '@material-ui/core';
import {useUser} from 'common/hooks/useUser';
import {storage, testNetwork} from 'common/stacks';
import {useCurrentAddress} from 'common/hooks/useCurrentAddress';
import {JIF_CHAT_CONTRACT} from 'common/constants';
import {useConnect} from '@stacks/connect-react';
import {
  createAssetInfo,
  FungibleConditionCode,
  noneCV,
  someCV,
  stringUtf8CV,
} from '@stacks/connect/node_modules/@stacks/transactions';
import {createFungiblePostCondition} from '@stacks/transactions';
import {BN} from 'bn.js';
import {useDispatch} from 'react-redux';
import api from 'store/api';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3),
  },
  button: {
    display: 'flex',
    marginTop: '1rem',
    marginLeft: 'auto',
  },
}));

function Post() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [gif, setGif] = React.useState(null);
  const [content, setContent] = React.useState('');
  const {isSignedIn} = useUser();
  const address = useCurrentAddress();
  const [contractAddress, contractName] = JIF_CHAT_CONTRACT.split('.');
  const {doContractCall} = useConnect();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const id = uuidv4();
      let fileUrl = '';
      if (gif) {
        const base64Video = await blobToBase64String(gif);
        const {type} = gif;
        fileUrl = await storage.putFile(
          id,
          JSON.stringify({
            base64Video,
            type,
          }),
          {
            encrypt: false,
          }
        );
      }

      doContractCall({
        contractAddress,
        contractName,
        functionName: 'send-message',
        functionArgs: [
          stringUtf8CV(content),
          fileUrl !== '' ? someCV(stringUtf8CV(fileUrl)) : noneCV(),
        ],
        onFinish() {
          dispatch(
            api.endpoints.getJifBalance.initiate(address, {
              forceRefetch: true,
            })
          );
          dispatch(
            api.endpoints.getJifTransactions.initiate(undefined, {
              forceRefetch: true,
            })
          );
          dispatch(
            api.endpoints.getPendingJifTransactions.initiate(undefined, {
              forceRefetch: true,
            })
          );
          setIsSubmitting(false);
          history.push('/');
        },
        postConditions: [
          createFungiblePostCondition(
            address,
            FungibleConditionCode.Equal,
            new BN(1),
            createAssetInfo(contractAddress, 'jif-token', 'jif-token')
          ),
        ],
        onCancel() {
          setIsSubmitting(false);
        },
        network: testNetwork,
        stxAddress: address,
      });
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  const onChange = e => {
    setContent(e.target.value);
  };

  // console.log({gif});
  return (
    <Layout>
      <Container maxWidth="xs">
        <Paper className={classes.paper}>
          <GifRecorder required={false} gifVideo={gif} setGifVideo={setGif} />
          <TextField value={content} onChange={onChange} />
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            disabled={!content?.trim() || isSubmitting || !isSignedIn}
            endIcon={isSubmitting ? <CircularProgress size="1rem" /> : <RiSendPlane2Fill />}
            onClick={handleSubmit}
          >
            Post
          </Button>
        </Paper>
      </Container>
    </Layout>
  );
}

export default Post;
