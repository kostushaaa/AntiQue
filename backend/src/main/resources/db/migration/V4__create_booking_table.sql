CREATE TABLE bookings (
                          id SERIAL PRIMARY KEY,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          start_date TIMESTAMP NOT NULL,
                          end_date TIMESTAMP NOT NULL,
                          status VARCHAR(20) NOT NULL,
                          user_id BIGINT NOT NULL,
                          car_id BIGINT NOT NULL,

                          CONSTRAINT fk_booking_user
                              FOREIGN KEY (user_id)
                                  REFERENCES users(id)
                                  ON DELETE CASCADE,

                          CONSTRAINT fk_booking_car
                              FOREIGN KEY (car_id)
                                  REFERENCES cars(id)
                                  ON DELETE CASCADE
);
