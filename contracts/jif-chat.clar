
(define-constant contract-creator tx-sender)

(define-constant JIF_TREASURY 'ST1FXMCG09ZQ36XKSSSWBVSB7TRJMH0DBRHA4VB24)

(define-data-var content-index uint u0)

(define-read-only (get-content-index)
  (ok (var-get content-index))
)
