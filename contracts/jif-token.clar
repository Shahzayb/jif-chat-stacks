;; Implement the `ft-trait` trait defined in the `ft-trait` contract
;; https://github.com/hstove/stacks-fungible-token
(impl-trait 'ST1FT1SWPBAJW3WS9JHMBFSQSJ7WXYM4R788NS2BY.sip-010-trait.sip-010-trait)

(define-constant contract-creator tx-sender)

(define-fungible-token jif-token)

;; Mint developer tokens
(ft-mint? jif-token u10000 contract-creator)

;; get the token balance of owner
(define-read-only (get-balance (owner principal))
  (begin
    (ok (ft-get-balance jif-token owner))))

;; returns the total number of tokens
(define-read-only (get-total-supply)
  (ok (ft-get-supply jif-token)))

;; returns the token name
(define-read-only (get-name)
  (ok "Jif Chat Token"))

;; the symbol or "ticker" for this token
(define-read-only (get-symbol)
  (ok "JIF"))

;; the number of decimals used
(define-read-only (get-decimals)
  (ok u0))

;; Transfers tokens to a recipient
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (if (is-eq tx-sender sender)
    (begin
      (try! (ft-transfer? jif-token amount sender recipient))
      (print memo)
      (ok true)
    )
    (err u4)))

(define-public (get-token-uri)
  (ok (some u"https://shahzayb.github.io/jif-chat-stacks/token-metadata.json")))

(define-public (gift-tokens (recipient principal))
  (begin
    (asserts! (is-eq tx-sender recipient) (err u0))
    (ft-mint? jif-token u1 recipient)
  )
)
