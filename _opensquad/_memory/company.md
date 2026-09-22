# Perfil da Empresa / Instituição: INEP — CILAES

## 1. Identificação Geral
- **Instituição:** INEP (Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira)
- **Portal Institucional:** http://inepnet.inep.gov.br/
- **Coordenação / Unidade:** CILAES / INEP (Coordenação de Instrumentos e Logística de Aplicação de Exames e Avaliações)
- **Responsável / Analista:** Lucas Cruz
- **Exames e Avaliações de Escopo:** ENADE, Revalida, EnaMED, PND e outros exames nacionais de grande porte.

---

## 2. Natureza e Missão da Atuação
A atuação na CILAES/INEP situa-se no epicentro da **ciência de dados aplicada à logística, qualidade, conformidade regulatória e auditoria cruzada de bases massivas**. 

O objetivo central é a transformação de grandes bancos de dados relacionais em evidências técnicas e jurídicas para:
1. Aprovação, controle ou glosa de entregáveis contratuais executados pelas instituições e consórcios aplicadores.
2. Garantia de que regras estritas de acessibilidade, deslocamento espacial, infraestrutura predial e segurança sejam efetivadas no mundo real.
3. Prevenção e gestão antecipada de crises logísticas antes da divulgação de cartões de confirmação e aplicação dos certames.

---

## 3. Stack Tecnológico e Ferramental
- **SAS Enterprise Guide:** Motor analítico principal para engenharia reversa de conformidade, construção de consultas estruturadas (`PROC SQL`, `DATA STEP`), cruzamentos cirúrgicos (`JOINs`), filtros de exceção (`NODUPKEY`, `LEFT JOIN` para detecção de nulos).
- **Microsoft Planner & Power BI:** Monitoramento contínuo, painéis de operação reversa e dashboards de inteligência operacional para os fiscais técnicos titulares e substitutos.
- **Bancos de Dados Relacionais & Arquivos Oficiais:** Processamento de bases padronizadas em formatos tabulares/planilhas estruturadas (`N02`, `N52`, `N60`, `N90`, `N91`, `N96`, etc.).

---

## 4. Dicionário de Bases de Dados e Layouts Principais

**Fontes ORACLE (origem oficial dos dados — ambiente DGP):**

| Objeto | Biblioteca | Tipo | Descrição |
| :--- | :--- | :--- | :--- |
| `VW_N90_INSCRITOS` | PND | VIEW | Inscritos no certame (base censitária/biográfica). |
| `VW_N91_ATENDIMENTOS` | PND | VIEW | Atendimentos especiais e laudos médicos deferidos. |
| `VW_N52_LOCAL` | MAPA_WEB | VIEW | Locais de prova e endereçamento operacional. |
| `TB_N02_ENSALAMENTO` | RBPND | TABLE | Vínculo participantes → local/sala de prova. |
| `TB_N60_QUEST_VISITA_LOCAL_PROVA` | RBPND | TABLE | Questionário de visita (vistoria in loco) ao local de prova. |
| `TB_N50_SALA_ESPACO_FISICO` | RBPND | TABLE | Salas e espaços físicos dos locais de prova. |

**Arquivos de layout (dicionário de dados das bases):**

| Layout / Arquivo | Finalidade | Principais Variáveis | Uso Analítico |
| :--- | :--- | :--- | :--- |
| **`LAYOUT_PND2618801_N90_INSCRITOS.xlsx`** | Base censitária e biográfica dos inscritos no certame. | `CO_PROJETO`, `CO_INSCRICAO`, `NO_INSCRITO`, `DT_NASCIMENTO`, `NU_CPF`, `CO_IES`, `CO_CURSO`, `CO_MUNICIPIO`, `NU_CEP` | Ponto de partida do funil. Cruzado com o N02 para identificar participantes órfãos (não ensalados). |
| **`Layout_PND2618801_N91_ATM_REC(2).xlsx`** | Matriz de deferimentos de condições especiais e laudos médicos. | `CO_INSCRICAO`, `ID_NECESSIDADE_PROJETO`, `ID_ITEM_ATENDIMENTO`, `CO_SITUACAO_LAUDO_MEDICO` | Cruzamento obrigatório com a capacidade e qualificação do local/sala (N60/N02) para mitigar riscos de quebra de acessibilidade. |
| **`LAYOUT_GLOBAL_N52_LOCACAO_ESPACO_FISICO.xlsx`** | Gerenciamento da rede de locação e endereçamento operacional. | `CO_LOCAL`, `NU_CNPJ`, `CO_BLOCO`, `NU_CEP`, `NO_BAIRRO` | Validação de infraestrutura para pagamento de uso oneroso e geolocalização por latitude/longitude do CEP. |
| **`LAYOUT_PND2618801_N60_QUESTIONARIO_DE_VISITA_AO_LOCAL_DE_PROVA.xlsx`** | Avaliação pontual de infraestrutura predial das vistorias *in loco*. | `CO_LOCAL`, `QT_ELEVADORES`, `QT_BANHEIRO_FEMININO`, `IN_INSTITUICAO_ENSINO` | Validador da fase de inspeção. Verifica se o local suporta as necessidades especiais do N91. |
| **`LAYOUT_PND2618801_N02_ENSALAMENTO.xlsx`** | Espelhamento oficial que vincula o participante ao espaço físico (sala). | `CO_INSCRICAO`, `CO_IES`, `NU_PROVA`, `CO_ATENDIMENTO_LISTA_PRESENCA`, `CO_LOCAL` | Auditoria cruzada final da lotação, dispersão geográfica e adequação dos cadernos de prova. |
| **`LAYOUT_PND2618801_N50_SALA_ESPACO_FISICO.xlsx`** | Catálogo de salas e espaços físicos por local de prova. | — | Vincula capacidade física das salas (N50) ao ensalamento (N02) e às vistorias (N60). |
| **`LAYOUT_PND2618801_N96_ACOMPANHAMENTO_OPERACAO_REVERSA.xlsx`** | Logística reversa e processamento tempestivo de materiais de retorno. | `TP_INSTRUMENTO`, `IN_RESERVA`, `DT_PROCESSAMENTO`, `NU_DIA` | Acompanhamento de SLAs de devolução de malotes, atas e cartões-resposta para alimentar painéis de controle. |

**Localização física dos arquivos de layout (ambiente Windows do analista):**

| Arquivo | Caminho local |
| :--- | :--- |
| N02 | `C:\Users\lucas.cruz\Downloads\LAYOUT_PND2618801_N02_ENSALAMENTO(4).xlsx` |
| N50 | `C:\Users\lucas.cruz\Downloads\LAYOUT_PND2618801_N50_SALA_ESPACO_FISICO.xlsx` |
| N52 | `C:\Users\lucas.cruz\Downloads\LAYOUT_GLOBAL_N52_LOCACAO_ESPACO_FISICO_PND.xlsx` |
| N60 | `C:\Users\lucas.cruz\Downloads\LAYOUT_PND2618801_N60_QUESTIONARIO_DE_VISITA_AO_LOCAL_DE_PROVA.xlsx` |
| N90 | `C:\Users\lucas.cruz\Downloads\LAYOUT_PND2618801_N90_INSCRITOS_04082026.xlsx` |
| N91 | `C:\Users\lucas.cruz\Downloads\Layout_PND2618801_N91_ATM_REC_17072026.xlsx` |

---

## 5. Entregáveis Contratuais Auditados (Produtos)

- **Produto EN1 (Infraestrutura e Ensalamento - Visita in Loco):** Validação de vistorias prediais e laudos fotográficos (Base N60).
- **Produto EN2 (Base de Dados do Ensalamento):** Distribuição dos participantes nas salas (N02). Exige auditoria de deslocamento (residentes ≤ 20km em linha reta por CEP) e centralização de "forasteiros" (residentes fora do município de aplicação).
- **Produto EN3 (Comprovação de Uso Oneroso e Kits de Limpeza):** Controle de não-cumulatividade (locais onerosos não recebem kit de limpeza e vice-versa), termos de declaração, detectores e ambulâncias (N52/EN3).
- **Produto PI1 (Preparação de Material Administrativo - Impressão Gráfica):** Dicionário de dados, mapeamento de campos (ex: `NO_SOCIAL`), limites de caracteres e tipagem para a gráfica aplicadora.
- **Produto OR1 & OR2 (Operação Reversa e Digitalização):** Rastreabilidade de malotes no retorno (N96), controle de SLAs diários e auditoria de digitalização em dupla sensibilidade.
- **Produto PA1 (Processamento e Leitura Óptica):** Consistência de leitura de cartões-resposta e aferição de taxas reais de absenteísmo.

---

## 6. Principais Trilhas e Casos de Auditoria
1. **Auditoria de Participantes Não Ensalados:** `N90 LEFT JOIN N02 ON CO_INSCRICAO WHERE N02.CO_INSCRICAO IS NULL`.
2. **Auditoria Territorial e Forasteiros:** Identificação de candidatos alocados fora do raio de 20 km ou forasteiros alocados em áreas periféricas de difícil transporte.
3. **Auditoria de Acessibilidade e Tempo Adicional:** Cruzamento `N91` (laudo deferido) com `N60` (itens como elevadores/acessibilidade arquitetônica) e `N02` (sala de prova).
4. **Auditoria de Conflito Financeiro:** Intersecção de `CO_LOCAL` entre faturamento oneroso e fornecimento de kits de limpeza (Produto EN3).
5. **Auditoria de Gargalos da Operação Reversa:** Monitoramento da taxa de retorno por município e tipo de instrumento (`N96`).

---

## 7. Tom de Voz e Comunicação
- **Perfil:** Técnico, analítico, rigoroso, estruturado e orientado a evidências de dados e conformidade regulatória.
- **Vocabulário:** Vocabulário formal de auditoria pública, engenharia de dados, termos normativos (Edital, Termo de Referência, Glosa, Aceite Técnico, SLA) e conceitos SAS/SQL.
