
import firebase from "firebase";
import { db, timestamp } from "../../../boot/main";
import moment from "moment";
import { parse } from "path";
import isOnline from "is-online";
export default {
  name: "Inicial",
  data() {
    return {
    };
  },
  methods: {
    Notificacao(Mensagem, Cor) {
      this.$q.notify({
        message: Mensagem,
        color: Cor
      });
    },
    Add() {
      const conteudo = {
        nomeDoArtista: this.nomeDoArtista,
        creditoConsumacao: this.creditoConsumacao,
        idDoArtista: null
      };
      this.edicaoDB
        .collection("consumacao")
        .add(conteudo)
        .then(ref => {
          const pushID = {
            idDoArtista: ref.id
          };
          ref.update(pushID);
          this.Notificacao('DJ - Consumação adicionada para DJ: "' + conteudo.nomeDoArtista + '"', "green");
          this.CriaLogInicial(ref.id);
        })
        .catch(() => {
          this.Notificacao("Não foi possível criar consumação para DJ", "red");
        });
    },
    LeituraListenner() {
      this.edicaoDB.collection("consumacao").onSnapshot(querySnapshot => {
        this.ListaDeDj = [];
        querySnapshot.forEach(doc => {
          this.ListaDeDj.push({
            idDoArtista: doc.id,
            nomeDoArtista: doc.data().nomeDoArtista,
            creditoConsumacao: doc.data().creditoConsumacao
          });
        });
      });
    },
    Update() {
      const operacaoSoma = (parseFloat(this.conceberMais) + parseFloat(this.creditoConsumacao)).toFixed(2);
      const objeto = {
        nomeDoArtista: this.nomeDoArtista,
        creditoConsumacao: operacaoSoma
      };
      this.edicaoDB
        .collection("consumacao")
        .doc(this.idDoArtista)
        .update(objeto)
        .then(() => {
          this.Notificacao("Consumação editada", "green");
          this.CriaCreditoEdicao();
        })
        .catch(() => {
          this.Notificacao("Erro ao tentar editar consumação", "green");
        });
    },
    Get() {
      this.edicaoDB
        .collection("ingressosGerados")
        .doc(this.resultado)
        .get()
        .then(doc => {

        }).catch(error => {

        })
    },
    async Delete() {
      if (await isOnline()) {
        if (this.edicaoDB != null) {
          if (this.TodosPermitidosNoContexto) {
            this.edicaoDB
              .collection("consumacao")
              .doc(this.idDoArtista)
              .delete()
              .then(() => {
                this.Notificacao("Consumação - DJ Removido com sucesso", "orange");
              })
              .catch(function (error) {
                this.Notificacao("Erro ao tentar remover DJ", "red");
              });
            this.dialogodeletaDJ = false;
          }
        }
      } else {
        this.Notificacao("Você está offline ou com conexão instável", "red");
      }
    },
  },
};