
DROP POLICY IF EXISTS "Anyone can submit an enquiry" ON public.enquiries;
CREATE POLICY "Anyone can submit an enquiry"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 120
  AND length(phone) BETWEEN 5 AND 30
  AND length(message) BETWEEN 1 AND 2000
  AND (email IS NULL OR length(email) <= 200)
  AND (product_type IS NULL OR length(product_type) <= 120)
  AND (quantity IS NULL OR length(quantity) <= 60)
  AND status = 'new'
);

DROP POLICY IF EXISTS "Anyone can place an order" ON public.orders;
CREATE POLICY "Anyone can place an order"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(customer_name) BETWEEN 1 AND 120
  AND length(phone) BETWEEN 5 AND 30
  AND length(product) BETWEEN 1 AND 200
  AND (email IS NULL OR length(email) <= 200)
  AND (size IS NULL OR length(size) <= 80)
  AND (quantity IS NULL OR length(quantity) <= 60)
  AND (notes IS NULL OR length(notes) <= 2000)
  AND status = 'pending'
  AND (total IS NULL OR total >= 0)
);
